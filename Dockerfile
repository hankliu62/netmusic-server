FROM keymetrics/pm2:latest-alpine

# 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的/home/Workspace/netmusic-server文件夹下
COPY src /home/Workspace/netmusic-server/src/
COPY package.json /home/Workspace/netmusic-server/
COPY pm2.json /home/Workspace/netmusic-server/

# cd到/home/Workspace/netmusic-server文件夹下
WORKDIR /home/Workspace/netmusic-server

# 安装项目依赖包
ENV NPM_CONFIG_LOGLEVEL warn
RUN rm -rf node_modules
RUN npm install --production --registry=https://registry.npm.taobao.org
