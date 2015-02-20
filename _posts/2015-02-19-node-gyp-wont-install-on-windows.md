--- 
layout: post
title: "node-gyp won't install on Windows"
author: "George Mauer"
comments: true
---

So I've run into this error like a million times already and every time I have to look up [this github issue](https://github.com/TooTallNate/node-gyp/issues/530#issuecomment-62498772).

I'm on windows, I do an npm install eg

    npm install -g node-inspector

and then, after what seemed like a success you get

    Building the projects in this solution one at a time. To enable parallel build, please add the "/m" switch.
C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\V120\Microsoft.Cpp.Platform.targets(64,5): error MSB8020: The build tools for Visual Studio 2010 (Platform Toolset = 'v100') cannot be found. To build using the v100 build tools, please install Visual Studio 2010 build tools.  Alternatively, you may upgrade to the current Visual Studio tools by selecting the Project menu or right-click the solution, and then selecting "Upgrade Solution...". [C:\Users\George\AppData\Roaming\npm\node_modules\node-inspector\node_modules\v8-pro filer\build\profiler.vcxproj]
    gyp ERR! build error
    vgyp ERR! stack Error: `C:\Program Files (x86)\MSBuild\12.0\bin\msbuild.exe` failed with exit code: 1
    gyp ERR! stack     at ChildProcess.onExit (C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\build.js:267:23)

Nonsense! I have Visual Studio 2013. Why do I need 2010 to install ... what is this `node-gyp`?

So, annoying defaults aside, here's the solution.

   npm install -g node-inspector --msvs-version=2013

That works. Annoying, but thats the solution for now.