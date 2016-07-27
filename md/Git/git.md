# 1.git是什么
Git是一款免费、开源的分布式版本控制系统

# 2.git安装

[安装地址](http://git-scm.com/downloads)


# 3.git初始化仓库
`git init` 
在**当前文件**夹下初始化一个仓库

# 4.git add 


|语法|效果|
|----|-----
|`git add -A `|从工作区填加**所有的改变的文件**到暂存区
|`git add . `|从工作区填加新的文件和改变的文件到暂存区，不包括**删掉的文件**。
|`git add -u `|从工作区填加 编辑过和删除的文件到暂存区，不包括**新的文件**。


# N.git 重写历史
### 重写git 最后一次提交的注释

`git commit --amend `

### 回退到指定提交历史编号的git版本

`git reset --hard XXXX`

**强制推送本地git版本更新远程仓库的git版本** 

`git push (远程仓库标识符)（远程分支）- f `




