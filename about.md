---
layout: post
title: About Me
comments: false
---

I'm George Mauer

This is my low effort blog. Mostly about software development. I regularly do presentations at various usergroups. I sometimes do them to my cat.

## Bio

I am a software developer, speaker, teacher, writer, and comedian with an interest in the various techniques that can make software simple, extensible, and communicative. I'm the owner of Humble Pi Software and currently a Director of Development with [Surge Consulting Group](http://www.surgeforward.com/). I teach and help build curriculum with [Operation Spark](https://operationspark.org/). I mentor with [Operation Code (unrelated)](https://operationcode.org/). I speak regularly on Javascript, C#, MVC, testing, interviewing, etc at conferences, usergroups, and to my cat.

[Find me on Twitter](https://twitter.com/togakangaroo) or try out the Disqus forms on my posts and let me know if they work. In general, it's not very hard to find a way to contact me.

## CSS-Only Wheeeee

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

<br>
<br>
<br>
<br>
<br>
<br>
<br>
