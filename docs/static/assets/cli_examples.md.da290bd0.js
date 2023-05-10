import{_ as s,c as a,o as n,O as e}from"./chunks/framework.d7e37bdc.js";const d=JSON.parse('{"title":"CLI Usage Example","description":"","frontmatter":{},"headers":[],"relativePath":"cli/examples.md","filePath":"cli/examples.md","lastUpdated":1683696965000}'),l={name:"cli/examples.md"},p=e(`<h1 id="cli-usage-example" tabindex="-1">CLI Usage Example <a class="header-anchor" href="#cli-usage-example" aria-label="Permalink to &quot;CLI Usage Example&quot;">​</a></h1><h2 id="webinterface-server" tabindex="-1">Webinterface server <a class="header-anchor" href="#webinterface-server" aria-label="Permalink to &quot;Webinterface server&quot;">​</a></h2><h3 id="savescum-serve" tabindex="-1"><code>savescum serve</code> <a class="header-anchor" href="#savescum-serve" aria-label="Permalink to &quot;\`savescum serve\`&quot;">​</a></h3><p>Start savescum webinterface. (<code>default command</code>)</p><h4 id="example-usage" tabindex="-1">Example usage <a class="header-anchor" href="#example-usage" aria-label="Permalink to &quot;Example usage&quot;">​</a></h4><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">savescum</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">serve</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># outputs</span></span>
<span class="line"><span style="color:#FFCB6B;">ℹ</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">serve</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">...</span></span>
<span class="line"><span style="color:#FFCB6B;">✔</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Server</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">listening</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">at</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">http://127.0.0.1:3000</span></span></code></pre></div><p>The webinterface is now running on your local system at <a href="http://127.0.0.1:3000" target="_blank" rel="noreferrer">http://127.0.0.1:3000</a>.</p><h2 id="ftp-server" tabindex="-1">FTP server <a class="header-anchor" href="#ftp-server" aria-label="Permalink to &quot;FTP server&quot;">​</a></h2><h3 id="savescum-ftp" tabindex="-1"><code>savescum ftp</code> <a class="header-anchor" href="#savescum-ftp" aria-label="Permalink to &quot;\`savescum ftp\`&quot;">​</a></h3><p>Perform operations with the PS4 FTP server. (<code>no standalone command</code>)</p><p><code>savescum ftp test</code></p><p>Test connection to PS4 FTP server.</p><h4 id="example-usage-1" tabindex="-1">Example usage <a class="header-anchor" href="#example-usage-1" aria-label="Permalink to &quot;Example usage&quot;">​</a></h4><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">savescum</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ftp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--ip=192.168.178.69</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># outputs</span></span>
<span class="line"><span style="color:#FFCB6B;">ℹ</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">connection</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">...</span></span>
<span class="line"><span style="color:#FFCB6B;">✔</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Connection</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">succeeded</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># or</span></span>
<span class="line"><span style="color:#FFCB6B;">savescum</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ftp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--ip=192.168.179.69</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--port=21</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--no-sound</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--debug</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># outputs</span></span>
<span class="line"><span style="color:#FFCB6B;">ℹ</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">connection</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Connecting</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ftp://anonymous@192.168.178.69:21</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">✔</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Connection</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">succeeded</span></span></code></pre></div><p><code>savescum ftp backup</code></p><p>Create local savegame backup from PS4 FTP server.</p><h4 id="example-usage-bloodborne-savegame" tabindex="-1">Example usage (Bloodborne savegame) <a class="header-anchor" href="#example-usage-bloodborne-savegame" aria-label="Permalink to &quot;Example usage (Bloodborne savegame)&quot;">​</a></h4><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">savescum</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ftp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--ip=192.168.178.69</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">backup </span><span style="color:#C3E88D;">--profile-id=1ceaa172</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--cusa=CUSA00207</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--sdimg=sdimg_SPRJ0005</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--debug</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># outputs</span></span>
<span class="line"><span style="color:#FFCB6B;">ℹ</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">backup</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Remote</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Path:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">└──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Local</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Path:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">C:</span><span style="color:#A6ACCD;">\\U</span><span style="color:#C3E88D;">sers</span><span style="color:#A6ACCD;">\\j</span><span style="color:#C3E88D;">rson</span><span style="color:#A6ACCD;">\\s</span><span style="color:#C3E88D;">avescum</span><span style="color:#A6ACCD;">\\1</span><span style="color:#C3E88D;">ceaa172</span><span style="color:#A6ACCD;">\\C</span><span style="color:#C3E88D;">USA00207</span><span style="color:#A6ACCD;">\\1</span><span style="color:#C3E88D;">683605652684</span><span style="color:#A6ACCD;">\\s</span><span style="color:#C3E88D;">dimg_SPRJ0005</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">✔</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Backup</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">completed</span></span></code></pre></div><p><code>savescum ftp restore</code></p><p>Restore local savegame backup to PS4 FTP server.</p><h4 id="example-usage-bloodborne-savegame-1" tabindex="-1">Example usage (Bloodborne savegame) <a class="header-anchor" href="#example-usage-bloodborne-savegame-1" aria-label="Permalink to &quot;Example usage (Bloodborne savegame)&quot;">​</a></h4><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">savescum</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ftp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--ip=192.168.178.69</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">restore </span><span style="color:#C3E88D;">--profile-id=1ceaa172</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--cusa=CUSA00207</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--sdimg=sdimg_SPRJ0005</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--debug</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># outputs</span></span>
<span class="line"><span style="color:#FFCB6B;">ℹ</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restore</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">├──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Local</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Path:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">C:</span><span style="color:#A6ACCD;">\\U</span><span style="color:#C3E88D;">sers</span><span style="color:#A6ACCD;">\\j</span><span style="color:#C3E88D;">rson</span><span style="color:#A6ACCD;">\\s</span><span style="color:#C3E88D;">avescum</span><span style="color:#A6ACCD;">\\1</span><span style="color:#C3E88D;">ceaa172</span><span style="color:#A6ACCD;">\\C</span><span style="color:#C3E88D;">USA00207</span><span style="color:#A6ACCD;">\\1</span><span style="color:#C3E88D;">683605652684</span><span style="color:#A6ACCD;">\\s</span><span style="color:#C3E88D;">dimg_SPRJ0005</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">└──</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Remote</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Path:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/user/home/1ceaa172/savedata/CUSA00207/sdimg_SPRJ0005</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">✔</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Restore</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">completed</span></span></code></pre></div>`,22),o=[p];function t(c,r,C,y,A,i){return n(),a("div",null,o)}const u=s(l,[["render",t]]);export{d as __pageData,u as default};
