---
layout: post
title: 了解学习使用docker
author: Jun
date: 2021-02-05 16:48:00 +0800
categories: [technology, 环境]
tags: [writing, docker]
hot: true
---



# 学习了解使用docker

docker是项目开发部署相关工具容器，本文通过[官网](https://www.docker.com/)等资料阅读学习，简单介绍一些基本使用操作：

1. docker是什么 
2. docker安装使用
3. 连接进入docker容器
4. docker拉取复制和上传

<!--more-->

## docker是什么

> 为什么会出现docker，常使用项目部署开发的人自然能理解，因为docker让服务部署更快更高效。

下面说一下docker是什么，有什么用，等同与说明为什么会出现docker这种技术。

docker主要是让服务部署更高效。[官网](https://www.docker.com/resources/what-container)称之为容器 container，在项目开发中开发环境/测试环境/生产环境通过docker容器技术统一，减少环境误差导致产生的错误，提高开发部署速度，减少部署维护成本。

### 镜像技术，隔离环境

我认为docker是一种镜像服务技术，他将原来linux上运行的服务全部放在docker内运行，linux和docker之间有一定的物理隔离和软件版本隔离效果，并且可以复制多个程序而避免重新安装，很好的提高服务器项目部署相关的工作效率，且有增加服务器安全系数。

（甚至介绍通过docker，可以让linux上的程序也能在windows照常运行，目前还没试过）

**镜像启动运行后，称之为容器。**

### 高效部署服务

当你有一个服务开发部署好了，服务器是linux，里面安装了mysql，nginx，java-application，redis，jdk8；现在服务器要扩展，同样的服务部署到多台服务器，要怎么做才高效？ 重新安装mysql，nginx，jdk8 ，然后各种配置端口密码各种参数，再重新启动每个程序？ 当你作为一个部署负责人的时候会觉得重复繁琐，并且配置细节很多，不小心会出差错，这时候镜像技术docker就能使服务部署快速，并避免少犯错，这时候docker可真是个好东西。

将原来的运行服务放在docker内运行，需要部署到其他服务器时，打包整个docker生成docker镜像，然后复制docker到新的linux服务器启动就好了，mysql，nginx，redis，等等很多东西不需要重新配置部署，只需要启动镜像docker和一些个性化的脚本。



## 安装docker



```bash
# 首先安装需要用到的工具
yum install -y yum-utils #安装工具 环境

#指定存储库
yum-config-manager     --add-repo     https://download.docker.com/linux/centos/docker-ce.repo
```



查询可安装版本

```bash
 yum list docker-ce --showduplicates | sort -r # 查看可用安装版本
 ## 找出stable版本的，表示稳定版，本次选的是
 ## docker-ce.x86_64         3:18.09.0-3.el7                        docker-ce-stable ##
 ## 安装
 yum install docker-ce-18.09.0 docker-ce-cli-18.09.0  containerd.io
 ## 规则 3:18.09.0-3.el7 为版本信息，那么安装就是 ce-后面加上18.09.0 
 ## 取3:18.09.0-3.el7的':'和'-'之间的字符"18.09.0"
```



运行测试

```bash
docker run hello-world
```



## 使用示例

[关于docker使用推荐文章](https://www.cnblogs.com/l-y-h/p/12622730.html)

### 拉取docker镜像

拉取一个 redis 镜像并运行

```bash
# 拉取 redis镜像
docker pull redis
# 查看当前镜像有哪些
docker images
# 通过镜像启动一个容器  -p 指定端口
docker run -p 3123:6379 --name some-redis -d redis redis-server --appendonly yes
# 通过docker 启动redis服务  
# 访问服务器3123端口时，映射到docker的6379端口 
# docker服务名 some-redis 
# --appendonly yes redis持久化，容器关闭后再启动，redis内的数据不失效

```

### 连接进入docker 容器

docker镜像运行后称为容器，我们可以进入容器，上面是redis服务容器，可以理解为一个centos服务器里面启动了redis服务，我们可以连接进去，并且里面是一个虚拟的linux环境

```bash
# 查看在运行的docker容器服务
docker -ps
# exec 表示连接进入容器 32jd3h21正在运行的容器的id
docker exec -it 32jd3h21 /bin/bash 
```

[相关文章](https://www.cnblogs.com/xhyan/p/6593075.html)

### docker复制上传

当我们定义好一个容器的环境，如果这个容器环境是普遍开发用到的，我们可以将容器镜像上传到仓库，用于统一开发环境，当其他人员也参与当前项目开发时，拉取同一个docker镜像开发，避免了项目代码运行环境差异。



[上传docker镜像文章](https://blog.csdn.net/qq_40568770/article/details/106868889)

docker hub 是专门用于docker镜像服务的仓库，我们需要先注册帐号，注册好后，创建仓库（和github类似）

我们在服务器里面先登录dockerhub账号，然后将需要上传的镜像push到仓库

```bash
# 查看镜像 
docker images
a4sdfa2 为某个docker镜像的id

# 复制创建一个要提交到远程的镜像
docker commit -a "author" -m "description" a4sdfa2  web1

# 设置仓库  web1 本地容器名   username dockerhub用户名  rep-url 用户的仓库名  v2 标签名
docker tag web1 username/rep-url:v2

# 拉取上传的docker镜像
docker pull username/rep-url:web1

# 最后通过pull命令拉取镜像 
```



## docker 容器中放项目代码吗？

一般项目开发，代码修改较频繁，镜像主要是用于统一运行环境，启动开始，不应含有具体开发项目代码。

给团队使用的docker容器应该是定义代码运行环境，而不是代码本身。每个开发人员拉取了docker镜像启动后，负责业务模块不同，很可能容器中运行的代码也不一样，容器放入代码反而多余；代码同步这快应该是通过git，svn等代码仓库工具完成更合适。