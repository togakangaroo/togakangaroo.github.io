---
layout: post
title: About Me
comments: false
---

I'm George Mauer

This is my low effort blog. Mostly about software development. I regularly do presentations at various usergroups. I sometimes do them to my cat.

## Bio

I am a software developer, speaker, teacher, writer, and comedian with an interest in the various techniques that can make software simple, extensible, and communicative. I'm the owner of Humble Pi Software and currently a senior developer with [Surge Consulting Group](http://www.surgeforward.com/). I teach and help build curriculum with [Operation Spark](https://operationspark.org/). I speak regularly on Javascript, C#, MVC, testing, interviewing, etc at conferences, usergroups, and to my cat.

[Find me on Twitter](https://twitter.com/togakangaroo) or try out the Disqus forms on my posts and let me know if they work. In general, it's not very hard to find a way to contact me.

## Projects

I am the creator of several open source projects that are hopefully useful to people.

* [persistState Widget](https://bitbucket.org/togakangaroo/ow.persiststate) - is a little jquery widget that will store the state of html widgets in localstorage and restore it on next page visit
* [simple-modules](https://github.com/togakangaroo/simple-modules) - is a javascript module system micro-library to help messy brownfield projects transition to cleaner code
* [ApprovalTests.BetterPdfVerification](https://github.com/togakangaroo/ApprovalTests.BetterPdfVerification) - is a set of approvers for the .Net version of the amazing ApprovalTests assertion framework. It makes approving of pdf files actually work as it normalizes out inconsistencies such as timestamps and auto generated ids.
* [Oaf.DeploymentInfo](https://bitbucket.org/oliverwymantechssg/oaf.deploymentinfo) - is a nuget package that will automatically embed information on your deployment into your project
* [thee](https://github.com/togakangaroo/thee) - a micro-library to shift `this` in javascript to a regular parameter.
* [log4net.GrowlAppender](https://bitbucket.org/togakangaroo/log4net.growlappender) - is a simple .Net library that will direct log4net messages to a locally running Growl instance
* A [bunch of nuget packages](https://www.nuget.org/profiles/togakangaroo)
* Some [npm packages](https://www.npmjs.com/~togakangaroo)

## Wheeeee

<section id="wheee">
	<div>George</div>
	<div>Mauer</div>	
	<style>
		#wheee div {
			display: flex;
			justify-content: center;
			margin: 10px;
			padding: 10px;
			border-radius: 5px;
			display: inline-block;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
			animation-duration: 2s;
			height: 1.5em;
			top: 100px;
			position: relative;
			background-image: url(/img/about/wood.jpg);
			color: #FFF;
		}
		#wheee {
			display: flex;
		}
		#wheee div:nth-child(1) {
			width: 50%;
			animation-name: rotateInstigation;
			left: 2em;
			transform-origin: 7px 19px;
		}
		#wheee div:nth-child(1):before {
			content: "᛭";
			margin-right: 15px;
		}
		@keyframes rotateInstigation {
		    0% {
		        transform: rotateZ(0deg);
		    }
			  100% {
				  transform: rotateZ(360deg);
			  }
		}

		#wheee div:nth-child(2) {
			width: 25%;
			padding 7px 10px;
			animation-name: rotateInResponse;
			background-position: -100px 79px;
			position: relative;
			left: -3%;
			margin-top: 10px;
		}
		#wheee div:nth-child(2):before {
			content: "᛭";
			position: absolute;
			left: calc(50% - 5px);
			top: calc(50% - 10px);
		}
		@keyframes rotateInResponse {
		    0% {
		        transform: rotateZ(-10deg);
		    }
				20% {
		        transform: rotateZ(-250deg);
				}
				25% {
		        transform: rotateZ(-306deg);
				}
		    50% {
		        transform: rotateZ(-343deg);
		    }
				75% {
					  transform: rotateZ(-363deg);
				}
			  100% {
				  transform: rotateZ(-370deg);
			  }
		}	
	</style>
</section>