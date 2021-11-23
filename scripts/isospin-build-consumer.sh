#!/bin/bash

AVAILABLE_PACKAGES=('admin-ui-extensions' 'admin-ui-extensions-react' 'checkout-ui-extensions' 'checkout-ui-extensions-react' 'post-purchase-ui-extensions' 'post-purchase-ui-extensions-react' 'checkout-ui-extensions-run')
ROOT=$(pwd)

# Font color
ORANGE='\033[1;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NONE='\033[0m'

# Font styles
DIM='\033[2m'
BOLD=$(tput bold)
NORMAL=$(tput sgr0)

projectDirectoryOrWorkspace=$1
packageName=$2
packages=()
debug=0

function set_globals() {
  targetRoot=$(resolve "$ROOT/../$projectDirectoryOrWorkspace")
  noTargetError="A target project directory is required: "
  
  shopifyNodeModulesDir="$targetRoot/node_modules/@shopify"
}

function run_command {
  local command=$1
  $command
}

function copy_to_target {
  local package=$1
  local packageFile=$2

  echo "copy_to_target -->"

  targetDir=$(resolve "$ROOT/../$projectDirectoryOrWorkspace/node_modules/@shopify/$package")


  if (run_command "[ -d $targetDir ]"); then
    debug $debug "rm -rf $targetDir"
    run_command "rm -rf $targetDir"
  fi

  if (run_command "[ ! -d $targetDir ]"); then
    debug $debug "mkdir $targetDir"

    run_command "mkdir -p $targetDir"
  fi

  if (run_command "[ -d $targetDir ]" && [[ -f "$packageFile" ]]); then
    echo "${DIM}[3/3]${NORMAL} 💿 Installing to node_modules..."

    debug $debug "$copy_command"
    cat $packageFile | run_command "tar xzf - --strip-components=1 -C $targetDir"
  fi
}

# Validation - project
function validate_project {
  local command=$1

  if (run_command "[ -z $projectDirectoryOrWorkspace ]"); then
    err "$noTargetError ${BOLD}$command${NORMAL}"
    exit 0
  fi

  if (run_command "[ ! -d $shopifyNodeModulesDir ]"); then
    err "node_modules directory not found in ${BOLD}$projectDirectoryOrWorkspace${NORMAL}"
    exit 0
  fi
  echo "Target: ${CYAN}$projectDirectoryOrWorkspace${NONE}"
}

# Validation - package names
function validate_package {
  if [[ $packageName == '-'* ]]; then
    unset packageName
  fi

  if [[ -z "$packageName" ]]; then
    packages=("${AVAILABLE_PACKAGES[@]}")
  else
    packages=($packageName)

    if [[ ! ${AVAILABLE_PACKAGES[*]} =~ "$packages" ]]; then
      local availablePackageNames=$(IFS=','; echo "${AVAILABLE_PACKAGES[*]}")
      err "${BOLD}$packageName${NORMAL} is not a valid package. Available packages: ${BOLD}$availablePackageNames${NORMAL}"
      exit 0
    fi
  fi

  echo "Source package(s): ${CYAN}${packages[@]}${NONE}"
}

function err() {
  echo "❌ $@" >&2
}

function debug() {
  local debug=$1
  local msg=$2

  if [[ "$debug" = 1 ]]; then
    echo "${DIM}$ $msg${NORMAL}"
  fi
}

# Convert a relative path to an absolute path. Does not check if resolved path exist.
#
# Input:
# $1 - path to resolve
#
# Output:
# absolute path with `.` and `..` resolved
function resolve() {
  local path="$1"

  # make sure the string isn't empty
  if [ -z "$path" ]; then
    return 0
  fi

  # resolve the path
  local segments=()
  local resolvedSegments=()

  bkpIFS="$IFS"
  IFS='/' read -r -a segments <<< "$path"
  IFS="$bkpIFS"

  for segment in "${segments[@]}"; do
    if [[ ( "$segment" = "" && ${#resolvedSegments[@]} > 0 ) || "$segment" = "." ]]; then continue; fi
    if [[ "$segment" = ".." ]]; then
      unset 'resolvedSegments[${#resolvedSegments[@]}-1]'
      continue
    fi
    resolvedSegments+=("$segment")
  done

  # output the absolute path
  echo $(IFS='/'; echo "${resolvedSegments[*]}")

  return 1
}

function build_consumer {
  spin=$1

  echo "💃 ${BOLD}Running build-consumer...${NORMAL}"

  set_globals
  validate_project '`yarn build-consumer PROJECT_DIRECTORY`'
  validate_package "$packageName"

  for package in "${packages[@]}"; do
    packageDir="$ROOT/packages/$package"
    packageFile="shopify-$package-latest.tgz"

    echo "Processing ${CYAN}$package${NONE}:"

    if [[ -d $packageDir ]]; then
      debug $debug "cd $packageDir"

      cd $packageDir

      packCmd="yarn pack --filename $packageFile"

      if [[ $debug = 0 ]]; then
        buildCmd+=" > /dev/null"
        packCmd+=" > /dev/null"
      fi

      echo "${DIM}[1/3]${NORMAL} 🏗  Building package..."
      debug $debug "$buildCmd"
      eval $buildCmd

      if [[ $? != 0 ]]; then
        err "Build failed. Please ensure there are no errors in the package."
        exit 1
      fi

      echo "${DIM}[2/3]${NORMAL} 📦 Packing for transport..."
      debug $debug "$packCmd"
      eval $packCmd
    fi

    copy_to_target $package $packageFile

    if [[ -f "$packageFile" ]]; then
    debug $debug "rm $packageFile"

    rm $packageFile
    fi

    echo "💪 Done."

  done

  echo "💃 ${GREEN}Build copied to ${BOLD}$projectDirectoryOrWorkspace${NORMAL}.${NONE} Run the project to see your changes from UI Extensions packages."

  exit 0
}

function restore_consumer {
  spin=$1

  echo "💃 ${BOLD}Running restore-consumer...${NORMAL}"

  set_globals
  validate_project '`yarn restore-consumer PROJECT_DIRECTORY`'

  for package in "${AVAILABLE_PACKAGES[@]}"; do
    targetDir="$shopifyNodeModulesDir/$package"
    echo "targetDIr: $targetDir"
    if (run_command "[ -d $targetDir ]"); then
      echo "🗑️  Cleaning up package ${ORANGE}$package${NONE}..."
      debug $debug "rm -rf $targetDir"

      rm -rf $targetDir
    fi

  done

  if (run_command "[ -d $targetRoot ]"); then
    debug $debug "cd $targetRoot"

    run_command "cd $targetRoot"

    echo "Running \`yarn install\` from $targetRoot"
    
    installCmd="yarn install --force --ignore-engines"

    debug $debug "$installCmd"

    $installCmd
  fi

  echo "💃 ${GREEN}Project ${BOLD}$projectDirectoryOrWorkspace${NORMAL} ${GREEN}restored.${NONE}"

  exit 0
}

usage="
Usage: $(basename "$0") <target_project> [<package_name>]

Build UI Extensions packages into a project

 <target_project>  Target project relative to Shopify root \`src/github.com/shopify\`, i.e. \`web\` or \`checkout-web\`
 <package_name>    Space separated package names
                   default: ${AVAILABLE_PACKAGES[@]}

 Options:
  -h, --help       Show this help text
  -d, --debug      Output messages for debugging"

# Get Options
options_counter=0
while [[ $# > 0 ]]; do
  options_counter=$(( options_counter+1 ))
  if (( $options_counter >= 3 )) && [[ $1 != '-'* ]]; then
    packageName="$packageName $1"; shift
  fi
  case $1 in
    -h|--help) echo "$usage"; exit;;
    -d|--debug) debug=1; shift;;
  esac
  shift
done

build_consumer
