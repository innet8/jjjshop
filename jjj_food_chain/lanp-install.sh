#!/bin/bash

# 更新系统环境
sudo apt update
sudo apt upgrade -y

#
#fonts color
##echo -e "${OK} ${GreenBG} $1 完成 ${Font}"
##echo -e "${Error} ${RedBG} $1 失败${Font}"
Green="\033[32m"
Red="\033[31m"
GreenBG="\033[42;37m"
RedBG="\033[41;37m"
Font="\033[0m"

#notification information
OK="${Green}[OK]${Font}"
Error="${Red}[错误]${Font}"


judge() {
    if [[ 0 -eq $? ]]; then
        echo -e "${OK} ${GreenBG} $1 完成 ${Font}"
        sleep 1
    else
        echo -e "${Error} ${RedBG} $1 失败${Font}"
        exit 1
    fi
}

#数据库信息
DB_TYPE=mysql
DB_HOST=127.0.0.1
DB_PREFIX=jjjfood_
DB_DATABASE=jjj
DB_USERNAME=jjj
DB_PASSWORD=asda12d34254dd
DB_PORT=3306
DB_ROOT_PASSWORD=asda12d34254dd

DB-OUTPUT(){
    echo "DB_TYPE=$DB_TYPE" >> ./.env
    echo "DB_HOST=$DB_HOST" >> ./.env
    echo "DB_PREFIX=$DB_PREFIX" >> ./.env
    echo "DB_DATABASE=$DB_DATABASE" >> ./.env
    echo "DB_USERNAME=$DB_USERNAME" >> ./.env
    echo "DB_PASSWORD=$DB_PASSWORD" >> ./.env
    echo "DB_PORT=$DB_PORT" >> ./.env
    echo "DB_ROOT_PASSWORD=$DB_ROOT_PASSWORD" >> ./.env
}

nginx-install(){
    # 安装 Nginx
    sudo apt install -y curl gnupg2 ca-certificates lsb-release ubuntu-keyring
    curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
    echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list 
    sudo apt update
    sudo apt install nginx
    nginx -v
    # if [ $? -ne 0 ]; then
    #     judge nginx服务安装失败
    # else
        systemctl  start nginx.service 
        systemctl  enable nginx.service 
        echo "nginx服务安装完成"
    # fi

}

mysql-install(){
    # 安装 MySQL 5.7
    cd /tmp/
    wget https://downloads.mysql.com/archives/get/p/23/file/mysql-server_5.7.42-1ubuntu18.04_amd64.deb-bundle.tar
    tar xaf mysql-server_5.7.42-1ubuntu18.04_amd64.deb-bundle.tar
    sudo apt update
    sudo apt install -y libaio1 libmecab2 python libjson-perl libtinfo5
    sudo dpkg -i mysql-common_5.7.42-1ubuntu18.04_amd64.deb
    sudo dpkg -i libmysqlclient20_5.7.42-1ubuntu18.04_amd64.deb
    sudo dpkg -i libmysqlclient-dev_5.7.42-1ubuntu18.04_amd64.deb
    sudo dpkg -i libmysqld-dev_5.7.42-1ubuntu18.04_amd64.deb
    sudo dpkg -i mysql-community-source_5.7.42-1ubuntu18.04_amd64.deb
    sudo dpkg -i mysql-community-client_5.7.42-1ubuntu18.04_amd64.deb
    sudo dpkg -i mysql-client_5.7.42-1ubuntu18.04_amd64.deb
    sudo DEBIAN_FRONTEND=noninteractive dpkg -i mysql-community-server_5.7.42-1ubuntu18.04_amd64.deb
    sudo dpkg -i mysql-server_5.7.42-1ubuntu18.04_amd64.deb
    #启动和开机自启
    systemctl  start mysql.service 
    systemctl  enable mysql.service 
    echo "开启外网访问"
    sed -i 's#127.0.0.1#0.0.0.0#g' /etc/mysql/mysql.conf.d/mysqld.cnf
    service mysql restart
    # 修改数据库 root 密码
    echo "ALTER USER 'root'@'localhost' IDENTIFIED BY 'asda12d34254dd';" | sudo mysql -uroot
    echo "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '${DB_ROOT_PASSWORD}' WITH GRANT OPTION;" | sudo mysql -uroot
    echo "FLUSH PRIVILEGES;" | sudo mysql -uroot
    # 创建数据库
    echo "CREATE DATABASE ${DB_PREFIX}_${DB_DATABASE} DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;" | sudo mysql -uroot -p${DB_ROOT_PASSWORD}

    # 创建用户并授权
    echo "CREATE USER '${DB_USERNAME}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';" | sudo mysql -uroot -p${DB_ROOT_PASSWORD}
    echo "GRANT ALL PRIVILEGES ON jjjfood_${DB_DATABASE}.* TO '${DB_USERNAME}'@'localhost';" | sudo mysql -uroot -p${DB_ROOT_PASSWORD}
    echo "FLUSH PRIVILEGES;" | sudo mysql -uroot -p${DB_ROOT_PASSWORD}
    DB-OUTPUT
}

php-install(){
    # 安装 PHP 8.2 及相关扩展
    sudo apt install -y software-properties-common
    sudo add-apt-repository -y ppa:ondrej/php
    sudo apt update
    sudo apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-curl php8.2-gd php8.2-mbstring php8.2-xml php8.2-zip  php8.2-bcmath php8.2-redis
    sudo apt install -y php8.2-mysql php8.2-mysqli
    # 解除禁用的函数
    sudo sed -i "s/disable_functions =.*/disable_functions =/g" /etc/php/8.2/fpm/php.ini
    systemctl start  php8.2-fpm.service
    systemctl enable php8.2-fpm.service
    # 安装composer
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer

    echo "安装完成"
}

RustDesk-install(){
    DOWNLOAD_URL="https://github.com/rustdesk/rustdesk/releases/download/1.2.3/rustdesk-1.2.3-x86_64.deb"
    PACKAGE_NAME="rustdesk-1.2.3-x86_64.deb"

    # 下载文件
    cd /tmp
    curl -O -L "$DOWNLOAD_URL"

    # 检查下载是否成功
    if [ $? -ne 0 ]; then
        echo "文件下载失败"
        exit 1
    fi

    # 安装软件包
    sudo apt install -fy "./$PACKAGE_NAME"

    # 检查安装是否成功
    if [ $? -ne 0 ]; then
        echo "软件包安装失败"
        exit 1
    fi

    # 启动 RustDesk 服务
    sudo systemctl start rustdesk.service

    # 设置 RustDesk 服务开机自启
    sudo systemctl enable rustdesk.service

    echo "RustDesk 下载和安装完成"
}

project-install(){
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
    mkdir -p dir
    if [ ! -f "dir/.git/config" ]; then
        git clone --depth=1 https://github.com/innet8/jjjshop.git $dir
        cd $dir
    else
        cd $dir
        git fetch --all && git reset --hard origin/$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
    fi
    if [ ! -f ".git/config" ]; then
        echo "Clone jjjshop fail"
        exit 0
    fi
    
    echo "project 安装完成"
}

install() {
    nginx-install
    mysql-install
    php-install
    RustDesk-install
}

update() {
    git fetch --all
    git reset --hard origin/$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
    git pull
    echo "project 更新完成"
}

uninstall() {
    # 卸载 Nginx
    sudo apt purge -y nginx

    # 卸载 MySQL 5.6
    sudo apt-get purge  -y  mysql-server mysql-client 

    # 卸载 PHP 8.2 及相关扩展
    sudo apt purge -y php8.2 php8.2-fpm php8.2-mysql php8.2-curl php8.2-gd php8.2-mbstring php8.2-xml php8.2-zip  php8.2-bcmath php8.2-redis
    sudo apt purge -y php8.2-mysql php8.2-mysqli

    echo "卸载完成"
}

if [ $# -eq 0 ]; then
    echo "请选择安装或卸载选项"
    echo "Usage: ./script.sh install|update|uninstall"
    exit 1
fi

case "$1" in
"install")
    install
    ;;
"update")
    update
    ;;
"uninstall")
    uninstall
    ;;
*)
    echo "无效的选项"
    echo "Usage: ./script.sh install|update|uninstall"
    exit 1
    ;;
esac