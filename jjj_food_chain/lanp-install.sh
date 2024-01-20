#!/bin/bash

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
# #数据库信息
# DB_TYPE=mysql
# DB_HOST=127.0.0.1
# DB_PREFIX=jjjfood_
# DB_DATABASE=jjj
# DB_USERNAME=jjj
# DB_PASSWORD=12345678
# DB_PORT=3306
# DB_ROOT_PASSWORD=12345678
# source $(pwd)/.env.example

git-clone(){
    git --version >/dev/null 2>&1
    GIT_INSTALLED=$?
    if [ $GIT_INSTALLED -eq 0 ]; then
        echo "Git is already installed."
    else
        echo "Git is not installed. Installing Git..."
        sudo apt update
        sudo apt install git
    fi
    echo -e "${Green}拉取项目代码${Font}"
    cd /
    git clone --depth=1 https://github.com/innet8/jjjshop.git
    chown -R www-data:root /jjjshop/
    chmod +x /jjjshop/jjj_food_chain/lanp-install.sh
    cd /jjjshop/jjj_food_chain
    if [ $? -ne 0 ]; then
        echo -e "${Error}拉取失败${Font}"
    else
        echo -e "${Green}拉取成功,开始设置环境变量${Font}"
        check-env
    fi
}

update-job(){
    cd /jjjshop/jjj_food_chain
    git fetch --all && git reset --hard origin/$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
    git pull
    sudo php think migrate:run
    chmod +x /jjjshop/jjj_food_chain/lanp-install.sh
}

check-env(){
    #判断是否存在.env文件，不存在则生成
    if [ ! -f "$(pwd)/.env" ]; then
        cp $(pwd)/.env.example $(pwd)/.env
        mysql_root_password=`head /dev/urandom | tr -dc A-Za-z0-9 | head -c 18`
        mysql_jjj_password=`head /dev/urandom | tr -dc A-Za-z0-9 | head -c 16`
        sed -i 's#DB_ROOT_PASSWORD=#DB_ROOT_PASSWORD='${mysql_root_password}'#g' $(pwd)/.env
        sed -i 's#DB_PASSWORD=#DB_PASSWORD='${mysql_jjj_password}'#g' $(pwd)/.env

    fi

    
}

nginx-install(){
    # 安装 Nginx
    echo -e "${Green}开始安装Nginx服务${Font}"
    sudo apt install -y curl gnupg2 ca-certificates lsb-release ubuntu-keyring
    curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
    echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list 
    sudo apt update
    sudo apt install nginx
    nginx -v
    sed -i 's#user\ \ nginx#user\ \ www-data#g' /etc/nginx/nginx.conf

cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen 8080;
    root /jjjshop/jjj_food_chain/public;
    server_name localhost;

    location /admin {
            index index.html;
    }
    location /h5 {
        try_files \$uri \$uri/ @router;
    }
    location @router {
         rewrite ^.*$ /h5/index.html last;
    }
    location /shop {
            index index.html;
    }
    location /cashier {
            index index.html;
    }


    location / {
        rewrite ^/index.php/(.*)$ /index.php?s=/\$1 last;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
    }

    gzip on;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css application/x-javascript application/json application/javascript image/x-icon image/png image/gif image/jpeg image/svg+xml;
    charset utf-8;
    access_log off;
}
EOF
    systemctl  start nginx.service 
    systemctl  enable nginx.service 
    echo -e "${Green}Nginx服务安装完成${Font}"


}

mysql-install(){
    # 安装 MySQL 5.7
     echo -e "${Green}开始安装Mysql服务${Font}"
    source /jjjshop/jjj_food_chain/.env
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
    echo -e "${Green}修改数据库监听地址${Font}"
    sed -i 's#127.0.0.1#0.0.0.0#g' /etc/mysql/mysql.conf.d/mysqld.cnf
    service mysql restart
    # 修改数据库 root 密码
    echo "ALTER USER 'root'@'localhost' IDENTIFIED BY '${DB_ROOT_PASSWORD}';" | sudo mysql -uroot
    # 允许外网访问
    echo "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '${DB_ROOT_PASSWORD}' WITH GRANT OPTION;" | sudo mysql -uroot
    echo "FLUSH PRIVILEGES;" | sudo mysql -uroot
    # 创建数据库
    echo "CREATE DATABASE ${DB_DATABASE} DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;" | sudo mysql -uroot -p${DB_ROOT_PASSWORD}

    # 创建用户并授权
    echo "CREATE USER '${DB_USERNAME}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';" | sudo mysql -uroot -p${DB_ROOT_PASSWORD}
    echo "GRANT ALL PRIVILEGES ON ${DB_DATABASE}.* TO '${DB_USERNAME}'@'localhost';" | sudo mysql -uroot -p${DB_ROOT_PASSWORD}
    echo "FLUSH PRIVILEGES;" | sudo mysql -uroot -p${DB_ROOT_PASSWORD}
    echo -e "${Green}数据库安装、初始化完成${Font}"
}

php-install(){
    # 安装 PHP 8.2 及相关扩展
    echo -e "${Green}开始安装PHP8.2服务${Font}"
    sudo apt install -y software-properties-common
    sudo add-apt-repository -y ppa:ondrej/php
    sudo apt update -y
    sudo apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-curl php8.2-gd php8.2-mbstring php8.2-xml php8.2-zip  php8.2-bcmath php8.2-redis
    sudo apt install -y php8.2-mysql php8.2-mysqli

    # 解除禁用的函数
    sudo sed -i 's#disable_functions =.*#disable_functions =#g' /etc/php/8.2/fpm/php.ini
    #sudo sed -i 's#;open\_basedir\ \=#open\_basedir\ \='$(pwd)'/jjj_food_chain#g'  /etc/php/8.2/fpm/php.ini 
    systemctl  start  php8.2-fpm.service
    systemctl  enable php8.2-fpm.service

    cd /jjjshop/jjj_food_chain
    curl -sS https://getcomposer.org/installer | php    
    mv composer.phar /usr/local/bin/composer
    sudo composer install -q
    sudo php think migrate:run
#使用systemd进行管理
cat > /etc/systemd/system/jjjshop.service <<EOF
[Unit]
Description=JJJshop Service
After=network.target

[Service]
ExecStart=/usr/bin/php /jjjshop/jjj_food_chain/think job start
Restart=always
StandardOutput=file:/var/log/jjjshop.log

[Install]
WantedBy=default.target
EOF
    systemctl start jjjshop.service
    systemctl enable jjjshop.service
    echo -e "${Green}PHP8.2 安装完成${Font}"
}

RustDesk-install(){
    echo -e "${Green}开始安装RustDesk服务${Font}"
    DOWNLOAD_URL="https://github.com/rustdesk/rustdesk/releases/download/1.2.3/rustdesk-1.2.3-x86_64.deb"
    PACKAGE_NAME="rustdesk-1.2.3-x86_64.deb"

    # 下载文件
    cd /tmp
    curl -O -L "$DOWNLOAD_URL"

    # 检查下载是否成功
    if [ $? -ne 0 ]; then
        echo -e "${Error}RustDesk软件包下载失败${Font}"
        exit 1
    fi

    # 安装软件包
    sudo apt install -fy "./$PACKAGE_NAME"

    # 检查安装是否成功
    if [ $? -ne 0 ]; then
        echo -e "${Error}RustDesk软件包安装失败${Font}"
        exit 1
    fi

    # 启动 RustDesk 服务
    sudo systemctl start rustdesk.service

    # 设置 RustDesk 服务开机自启
    sudo systemctl enable rustdesk.service

    echo -e "${Green}安装RustDesk服务完成${Font}"
}

install() {
    nginx-install
    mysql-install
    php-install
    RustDesk-install
}

uninstall() {
    while true; do
        read -p "卸载会删除数据库文件和项目目录，是否继续执行？(y/n): " answer
        # 将用户输入转换为小写
        answer=$(echo $answer | tr '[:upper:]' '[:lower:]')
        if [[ "$answer" == "y" ]]; then
            echo "继续执行"
            # 卸载 Nginx
            sudo apt purge -y nginx

            # 卸载 MySQL 5.6
            sudo apt-get purge  -y  mysql-server mysql-client -qq

            # 卸载 PHP 8.2 及相关扩展
            sudo apt purge -y php8.2 php8.2-fpm php8.2-mysql php8.2-curl php8.2-gd php8.2-mbstring php8.2-xml php8.2-zip  php8.2-bcmath php8.2-redis
            sudo apt purge -y php8.2-mysql php8.2-mysqli

            # 卸载远程软件
            apt-get purge  -y  /tmp/rustdesk-1.2.3-x86_64.deb
            
            #删除项目
            rm -rf /jjjshop/
            echo -e "${Green}卸载完成${Font}"
            break
        elif [[ "$answer" == "n" ]]; then
            echo "结束脚本"
            exit 0
        else
            echo "无效选项，请重新输入"
        fi
    done
    
    
}

if [ $# -eq 0 ]; then
    echo "请选择安装或卸载选项"
    echo "Usage: ./script.sh install|uninstall|update"
    exit 1
fi

case "$1" in
"install")
    # 更新系统环境
    echo -e "${Green}更新系统软件源${Font}"
    sudo apt update
    #sudo apt upgrade -y
    git-clone
    install
    ;;
"uninstall")
    uninstall
    ;;
"update")
    update-job
    ;;
*)
    echo "无效的选项"
    echo "Usage: ./script.sh install|uninstall|update"
    exit 1
    ;;
esac