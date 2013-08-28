ghpages-convert
===============

A command line tool to convert github page templates to blogs

[![Build Status](https://travis-ci.org/tjchaplin/ghpages-convert.png?branch=0.0.24)](https://travis-ci.org/tjchaplin/ghpages-convert)

## Installation
```
npm install scarlet
```

## Convert

```
$: cd ~/myGithubPage
$: ghpages-convert
//-> your github page template will now be converted to a bloggable format for jekyll
```

## Motivation

Github provides nice templates to use for your applications and projects.  The templates don't utilize some of the full features of [Jekyll](http://jekyllrb.com/), the engine Github uses to generate pages.  To make the convert the template pages to a blog type format can be time consuming and difficult.

This project simply takes pages generated through github pages and converts them to a bloggable jekyll format.  This includes the creation of the following directories:
* _layouts - page/post layouts
* _includes - page/post includes such as header/footer etc
* _posts - individual post directory
* _assets - images and such that can be linked

ghpages-convert parses the html in the **index.html** file generated through github's automatic page generator and breaks up the html into the respective folders.

## Steps by Step

You should follow Github instructions for how to use the [Automatic Page Generator](https://help.github.com/articles/creating-pages-with-the-automatic-generator).  

Once you have created your page you can skil to step *4*

I have also provided a brief summary of all the instructions:

1. In a repository, select Settings --> Automatic Page Generator
2. Follow the instructions and pick a template that best fits
3. Once the Automatic Page Generator is complete, your page will be available
3.1 Example Url: [tjchaplin.github.io/ghpages-convert/](tjchaplin.github.io/ghpages-convert/)
4. clone your repository to your machine

```
git clone <your repository
```

5. Switch your branch to the gh-pages branch

```
git checkout gh-pages
```

6. run ghpages-convert to convert your page

```
$: cd ~/myGithubPage
$: ghpages-convert
//-> your github page template will now be converted to a bloggable format for jekyll
```

7. Add the added files to your git repository

```
$: git add _layouts/*
$: git add _posts/*
$: git add _includes/*
$: git add _assets/*
```


