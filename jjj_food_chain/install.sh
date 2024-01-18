#!/bin/bash

install() {
    git --version >/dev/null 2>&1
    GIT_INSTALLED=$?
    if [ $GIT_INSTALLED -eq 0 ]; then
        echo "Git is already installed."
    else
        echo "Git is not installed. Installing Git..."
        sudo apt update
        sudo apt install git
    fi

    local dir=jjjshop
    mkdir -p $dir
    if [ ! -f "$dir/.git/config" ]; then
        git clone --depth=1 https://github.com/innet8/jjjshop.git $dir
        cd $dir
    else
        cd $dir
        git fetch --all && git reset --hard origin/$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
    fi
    if [ ! -f ".git/config" ]; then
        echo "Clone jjjshop fail"
    else
        cd jjj_food_chain
        chmod +x ./lanp-install.sh install
    fi
}
install