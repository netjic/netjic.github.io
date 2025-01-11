import{_ as i,c as a,a as e,o as t}from"./app-DW7nVNk3.js";const n={};function l(d,s){return t(),a("div",null,s[0]||(s[0]=[e(`<h2 id="groupadd命令" tabindex="-1"><a class="header-anchor" href="#groupadd命令"><span>groupadd命令</span></a></h2><p>创建新的用户组。</p><p>groupadd命令来自于英文词组“group add”。每个用户在创建时都有一个与其同名的基本组，后期可以使用groupadd命令创建出新的用户组信息，让多个用户加入到指定的扩展组中。</p><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>-g</td><td>指定新建工作组的id</td></tr><tr><td>-r</td><td>创建系统工作组</td></tr><tr><td>-K</td><td>覆盖配置文件“/ect/login.defs”</td></tr><tr><td>-o</td><td>允许添加组ID号不唯一的工作组</td></tr></tbody></table><p>参考示例：</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 创建一个新的用户组</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">groupadd</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> user1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 创建一个新的用户组，并指定GID号码</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">groupadd</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -g</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 6688</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> user1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 创建一个新的用户组，设定为系统工作组</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">groupadd</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -r</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> user1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="groupdel命令" tabindex="-1"><a class="header-anchor" href="#groupdel命令"><span>groupdel命令</span></a></h2><p>删除用户组。</p><p>groupdel命令用于删除指定的工作组，本命令要修改的系统文件包括/ect/group和/ect/gshadow。</p><p>userdel修改系统账户文件，删除与 GROUP 相关的所有项目。给出的组名必须存在。若该群组中仍包括某些用户，则必须先删除这些用户后，方能删除群组。</p><p>参考示例：</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 使用groupdel命令删除user1工作组</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">groupdel</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> user1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 查看user1组是否删除成功</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">more</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /etc/group</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">grep</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> user1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="groupmod命令" tabindex="-1"><a class="header-anchor" href="#groupmod命令"><span>groupmod命令</span></a></h2><p>更改群组识别码或名称。</p><p>用户名不要随意修改，组名和 GID 也不要随意修改，因为非常容易导致管理员逻辑混乱。如果非要修改用户名或组名，则建议先删除旧的，再建立新的。</p><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>-g</td><td>设置欲使用的群组识别码</td></tr><tr><td>-o</td><td>重复使用群组识别码</td></tr><tr><td>-n</td><td>设置欲使用的群组名称</td></tr></tbody></table><p>参考示例</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 更改user1用户组为root</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">groupmod</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -n</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> root</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> user1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,18)]))}const p=i(n,[["render",l],["__file","index.html.vue"]]),h=JSON.parse('{"path":"/linux/%E7%94%A8%E6%88%B7%E7%BB%84%E7%AE%A1%E7%90%86%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4/9nuu4sno/","title":"用户组管理常用命令","lang":"zh-CN","frontmatter":{"title":"用户组管理常用命令","createTime":"2025/01/08 15:10:17","permalink":"/linux/用户组管理常用命令/9nuu4sno/"},"headers":[],"readingTime":{"minutes":1.55,"words":466},"git":{"updatedTime":1736323201000,"contributors":[{"name":"netjic","username":"netjic","email":"netjic@163.com","commits":1,"avatar":"https://gravatar.com/avatar/374578fe375437866193fe849b770e3f9c74eacc1a7125303870c05b7a97309d?d=retro"}]},"filePathRelative":"notes/linux/用户组管理常用命令.md","bulletin":false}');export{p as comp,h as data};