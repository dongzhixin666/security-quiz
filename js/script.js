        
        // HTML转义函数，防止XSS攻击
        function escapeHtml(text) {
            if (!text) return '';
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        const questions = [
{"id":"单选题1","type":"单选题","question":"单选题1、SQL注入攻击的本质是什么？","options":["A.拒绝服务攻击","B.将SQL代码插入应用程序的查询中","C.暴力破解密码","D.跨站脚本攻击"],"answer":"B","analysis":"SQL注入攻击是指攻击者通过在Web应用的输入字段中插入恶意SQL语句，使这些语句被数据库执行。","category":"SQL注入"},
{"id":"单选题2","type":"单选题","question":"单选题2、以下哪种SQL注入类型不需要使用单引号闭合？","options":["A.字符型注入","B.搜索型注入","C.数字型注入","D.Cookie注入"],"answer":"C","analysis":"数字型注入的参数是数字类型，SQL语句中该参数不带引号，因此注入时不需要闭合引号。","category":"SQL注入"},
{"id":"单选题3","type":"单选题","question":"单选题3、在MySQL中，注释符不包括以下哪个？","options":["A.--","B.#","C./**/","D.//"],"answer":"D","analysis":"MySQL支持的注释符包括：--、#、/*...*/。//不是MySQL的注释符。","category":"SQL注入"},
{"id":"单选题4","type":"单选题","question":"单选题4、SQL注入中，union select语句的作用是？","options":["A.删除数据","B.合并两个查询的结果集","C.修改数据","D.创建新表"],"answer":"B","analysis":"UNION SELECT用于合并两个或多个SELECT语句的结果集，要求列数相同且数据类型兼容。","category":"SQL注入"},
{"id":"单选题5","type":"单选题","question":"单选题5、以下哪个函数可以获取MySQL当前数据库名？","options":["A.version()","B.user()","C.database()","D.@@datadir"],"answer":"C","analysis":"database()函数返回当前数据库名称。","category":"SQL注入"},
{"id":"单选题6","type":"单选题","question":"单选题6、SQL注入攻击通常发生在Web应用的哪个层？","options":["A.前端展示层","B.业务逻辑层","C.数据访问层","D.网络传输层"],"answer":"C","analysis":"SQL注入攻击发生在数据访问层，因为攻击者通过构造恶意输入，使应用程序执行非预期的SQL语句。","category":"SQL注入"},
{"id":"单选题7","type":"单选题","question":"单选题7、以下哪个不是SQL注入的常见分类？","options":["A.数字型注入","B.字符型注入","C.搜索型注入","D.文件型注入"],"answer":"D","analysis":"SQL注入常见分类包括数字型、字符型、搜索型、盲注、堆叠注入等。文件型注入不属于SQL注入分类。","category":"SQL注入"},
{"id":"单选题8","type":"单选题","question":"单选题8、预防SQL注入最有效的方法是？","options":["A.使用HTTPS","B.使用预编译语句（参数化查询）","C.使用防火墙","D.限制数据库权限"],"answer":"B","analysis":"预编译语句将SQL语句结构与数据分离，使输入数据不会被解释为SQL代码。","category":"SQL注入"},
{"id":"单选题9","type":"单选题","question":"单选题9、以下哪个工具是专门用于SQL注入检测的？","options":["A.Nmap","B.Wireshark","C.sqlmap","D.BurpSuite"],"answer":"C","analysis":"sqlmap是专门用于检测和利用SQL注入漏洞的开源工具。","category":"SQL注入"},
{"id":"单选题10","type":"单选题","question":"单选题10、在MySQL中，information_schema库的作用是？","options":["A.存储用户数据","B.存储数据库元数据信息","C.存储系统日志","D.存储临时数据"],"answer":"B","analysis":"information_schema是MySQL的系统数据库，存储了数据库、表、列等元数据信息。","category":"SQL注入"},
{"id":"单选题11","type":"单选题","question":"单选题11、以下哪种方法不能用于判断注入点？","options":["A.添加单引号观察报错","B.添加and 1=1和and 1=2对比","C.使用sleep()函数","D.修改URL协议"],"answer":"D","analysis":"判断注入点的常用方法包括：单引号测试、逻辑测试、时间延迟测试等。修改URL协议无法判断注入点。","category":"SQL注入"},
{"id":"单选题12","type":"单选题","question":"单选题12、布尔盲注的核心原理是？","options":["A.通过页面返回的真假判断条件真假","B.通过时间延迟判断条件真假","C.通过报错信息获取数据","D.通过union查询获取数据"],"answer":"A","analysis":"布尔盲注通过构造条件语句，根据页面返回的不同状态来判断条件是否成立。","category":"SQL注入"},
{"id":"单选题13","type":"单选题","question":"单选题13、时间盲注中常用的延迟函数是？","options":["A.concat()","B.sleep()","C.substr()","D.ascii()"],"answer":"B","analysis":"sleep()函数用于在MySQL中引入时间延迟，是时间盲注的核心函数。","category":"SQL注入"},
{"id":"单选题14","type":"单选题","question":"单选题14、以下哪个不是报错注入的常用函数？","options":["A.extractvalue()","B.updatexml()","C.floor()","D.version()"],"answer":"D","analysis":"报错注入常用函数包括extractvalue()、updatexml()、floor()等。version()只是获取版本信息的函数。","category":"SQL注入"},
{"id":"单选题15","type":"单选题","question":"单选题15、宽字节注入利用的字符集编码是？","options":["A.UTF-8","B.ASCII","C.GBK","D.Unicode"],"answer":"C","analysis":"宽字节注入主要针对GBK编码的数据库。","category":"SQL注入"},
{"id":"单选题16","type":"单选题","question":"单选题16、HTTP Header注入通常出现在哪个位置？","options":["A.URL参数","B.表单数据","C.User-Agent或Cookie","D.请求体"],"answer":"C","analysis":"HTTP Header注入发生在请求头字段中，常见于User-Agent、Cookie等字段。","category":"SQL注入"},
{"id":"单选题17","type":"单选题","question":"单选题17、二次注入的核心原理是？","options":["A.直接在URL中注入","B.先将恶意数据存入数据库，再在其他页面触发","C.通过Cookie注入","D.通过文件上传注入"],"answer":"B","analysis":"二次注入是指攻击者先将恶意数据存入数据库，当这些数据被读取并用于构造SQL查询时触发注入。","category":"SQL注入"},
{"id":"单选题18","type":"单选题","question":"单选题18、堆叠查询（Stacked Query）注入的特点是？","options":["A.只能执行SELECT语句","B.可以执行多条SQL语句","C.不需要闭合引号","D.只能用于MySQL"],"answer":"B","analysis":"堆叠查询注入允许攻击者执行多条SQL语句，用分号分隔。","category":"SQL注入"},
{"id":"单选题19","type":"单选题","question":"单选题19、以下哪种防御手段可以防止SQL注入？","options":["A.使用存储过程","B.输入验证和过滤","C.使用WAF","D.以上都可以"],"answer":"D","analysis":"多种手段可以共同防御SQL注入。","category":"SQL注入"},
{"id":"单选题20","type":"单选题","question":"单选题20、在 sqli-labs 中，Less-11 使用的是哪种注入方式？","options":["A.GET 方式","B.POST 方式","C.Cookie 方式","D.Header 方式"],"answer":"B","analysis":"sqli-labs 的 Less-11 是基于 POST 方式的注入。","category":"SQL注入"},
{"id":"单选题21","type":"单选题","question":"单选题21、以下哪个不是 SQLmap 的常用参数？","options":["A.-u","B.--dbs","C.--tables","D.--ping"],"answer":"D","analysis":"--ping 不是 sqlmap 的常用参数。","category":"SQL注入"},
{"id":"单选题22","type":"单选题","question":"单选题22、SQL 注入中 order by 语句的作用是？","options":["A.排序结果","B.判断列数","C.删除数据","D.插入数据"],"answer":"B","analysis":"order by 语句用于判断查询结果的列数。","category":"SQL注入"},
{"id":"单选题23","type":"单选题","question":"单选题23、以下哪种数据库不支持堆叠查询？","options":["A.MySQL","B.SQL Server","C.Oracle","D.SQLite"],"answer":"C","analysis":"Oracle 不支持堆叠查询（Stacked Query）。","category":"SQL注入"},
{"id":"单选题24","type":"单选题","question":"单选题24、DNS 外带注入的原理是？","options":["A.通过 DNS 查询将数据发送到攻击者服务器","B.通过 DNS 解析漏洞获取数据","C.通过 DNS 欺骗获取数据","D.通过 DNS 缓存投毒获取数据"],"answer":"A","analysis":"DNS 外带注入通过 DNS 查询将数据发送到攻击者控制的服务器。","category":"SQL注入"},
{"id":"单选题25","type":"单选题","question":"单选题25、以下哪个函数可以获取 MySQL 版本信息？","options":["A.database()","B.user()","C.version()","D.schema()"],"answer":"C","analysis":"version() 函数返回 MySQL 数据库的版本信息。","category":"SQL注入"},
{"id":"单选题26","type":"单选题","question":"单选题26、sqlmap 中，-p 参数的作用是？","options":["A.指定代理","B.指定注入参数","C.指定密码","D.指定端口"],"answer":"B","analysis":"-p 参数用于指定要测试的注入参数。","category":"SQL注入"},
{"id":"单选题27","type":"单选题","question":"单选题27、联合注入要求两个查询的列数必须？","options":["A.不同","B.相同","C.前者多于后者","D.后者多于前者"],"answer":"B","analysis":"联合注入要求两个 SELECT 语句的列数必须相同。","category":"SQL注入"},
{"id":"单选题28","type":"单选题","question":"单选题28、以下哪个字符在 SQL 中是单行注释符？","options":["A./*","B.//","C.--","D.##"],"answer":"C","analysis":"-- 是 SQL 中的单行注释符。","category":"SQL注入"},
{"id":"单选题29","type":"单选题","question":"单选题29、BurpSuite 中，Intruder 模块的主要功能是？","options":["A.拦截 HTTP 请求","B.自动化暴力测试","C.重放请求","D.扫描漏洞"],"answer":"B","analysis":"Intruder 模块主要用于自动化暴力测试。","category":"SQL注入"},
{"id":"单选题30","type":"单选题","question":"单选题30、以下哪个不是 MySQL 数据库的默认端口？","options":["A.3306","B.3307","C.1433","D.以上都不是默认端口"],"answer":"C","analysis":"1433 是 SQL Server 的默认端口，MySQL 默认是 3306。","category":"SQL注入"},
{"id":"单选题31","type":"单选题","question":"单选题31、在 Union 注入中，NULL 的作用是？","options":["A.替代具体数值以避免类型错误","B.表示空值查询","C.注释后续代码","D.表示布尔假"],"answer":"A","analysis":"在 Union 注入中，NULL 用于替代具体数值以避免类型错误。","category":"SQL注入"},
{"id":"单选题32","type":"单选题","question":"单选题32、以下哪种注入方式效率最低？","options":["A.联合注入","B.报错注入","C.时间盲注","D.布尔盲注"],"answer":"C","analysis":"时间盲注效率最低，因为需要等待时间延迟。","category":"SQL注入"},
{"id":"单选题33","type":"单选题","question":"单选题33、WAF 的全称是？","options":["A.Web Application Firewall","B.Web Access Filter","C.Wide Area Firewall","D.Web Attack Framework"],"answer":"A","analysis":"WAF 全称是 Web Application Firewall。","category":"数据库防火墙"},
{"id":"单选题34","type":"单选题","question":"单选题34、以下哪个是 sqlmap 检测注入时的默认级别（level）？","options":["A.1","B.3","C.5","D.2"],"answer":"A","analysis":"sqlmap 的默认检测级别是 1。","category":"SQL注入"},
{"id":"单选题35","type":"单选题","question":"单选题35、MySQL 中，group_concat()函数的作用是？","options":["A.统计记录数","B.将多行数据合并为一行","C.获取最大值","D.字符串截取"],"answer":"B","analysis":"group_concat() 函数用于将多行数据合并为一行。","category":"SQL注入"},
{"id":"单选题36","type":"单选题","question":"单选题36、以下哪个不是 BurpSuite 的功能模块？","options":["A.Proxy","B.Scanner","C.Decoder","D.Compiler"],"answer":"D","analysis":"Compiler 不是 BurpSuite 的功能模块。","category":"SQL注入"},
{"id":"单选题37","type":"单选题","question":"单选题37、报错注入中，extractvalue()函数报错的原因是？","options":["A.SQL 语法错误","B.XPath 路径格式非法","C.列数不匹配","D.字段类型错误"],"answer":"B","analysis":"extractvalue() 函数报错是因为 XPath 路径格式非法。","category":"SQL注入"},
{"id":"单选题38","type":"单选题","question":"单选题38、以下哪种方式可以绕过 WAF 对 union 的过滤？","options":["A.使用 uNiOn 大小写混写","B.使用双写 uniunionon","C.使用内联注释 un/**/ion","D.以上都可以"],"answer":"D","analysis":"以上三种方式都可以用于绕过 WAF 对 union 的过滤。","category":"数据库防火墙"},
{"id":"单选题39","type":"单选题","question":"单选题39、sqlmap 中--level=3 及以上会自动检测什么？","options":["A.POST 参数","B.Cookie 参数","C.HTTP Header 参数","D.XML 参数"],"answer":"C","analysis":"--level=3 及以上会自动检测 HTTP Header 参数。","category":"SQL注入"},
{"id":"单选题40","type":"单选题","question":"单选题40、以下哪种 SQL 注入不依赖页面是否有回显？","options":["A.联合注入","B.报错注入","C.时间盲注","D.堆叠注入"],"answer":"C","analysis":"时间盲注不依赖页面是否有回显，只依赖响应时间。","category":"SQL注入"},
{"id":"单选题41","type":"单选题","question":"单选题41、在 sqli-labs 中，第一关（Less-1）属于哪种注入类型？","options":["A.数字型注入","B.字符型注入（单引号）","C.布尔盲注","D.时间盲注"],"answer":"B","analysis":"sqli-labs 的 Less-1 是基于单引号的字符型注入。","category":"SQL注入"},
{"id":"单选题42","type":"单选题","question":"单选题42、以下哪个 MySQL 函数可以读取服务器上的文件？","options":["A.file_get()","B.read_file()","C.load_file()","D.get_file()"],"answer":"C","analysis":"load_file() 函数用于读取服务器上的文件。","category":"SQL注入"},
{"id":"单选题43","type":"单选题","question":"单选题43、MySQL 中，into outfile 语句的作用是？","options":["A.导入数据","B.将查询结果写入文件","C.备份数据库","D.创建视图"],"answer":"B","analysis":"into outfile 语句用于将查询结果写入文件。","category":"SQL注入"},
{"id":"单选题44","type":"单选题","question":"单选题44、以下哪个不是常见的 SQL 注入测试 payload？","options":["A.' or '1'='1","B.1 and 1=1","C.1; drop table users--","D.SELECT * FROM users"],"answer":"D","analysis":"SELECT * FROM users 是正常查询语句，不是注入测试 payload。","category":"SQL注入"},
{"id":"单选题45","type":"单选题","question":"单选题45、BurpSuite 的 Proxy 模块监听的默认端口是？","options":["A.8888","B.8080","C.9090","D.7070"],"answer":"B","analysis":"BurpSuite 的 Proxy 模块默认监听 8080 端口。","category":"SQL注入"},
{"id":"单选题46","type":"单选题","question":"单选题46、以下哪种编码方式常用于 WAF 绕过？","options":["A.Base64","B.URL 编码","C.MD5","D.SHA256"],"answer":"B","analysis":"URL 编码常用于 WAF 绕过。","category":"数据库防火墙"},
{"id":"单选题47","type":"单选题","question":"单选题47、MySQL 中，@@version_compile_os 变量存储什么信息？","options":["A.数据库版本","B.编译时的操作系统","C.数据库安装路径","D.字符集信息"],"answer":"B","analysis":"@@version_compile_os 存储编译时的操作系统信息。","category":"SQL注入"},
{"id":"单选题48","type":"单选题","question":"单选题48、以下哪个工具不属于 Web 渗透测试常用工具？","options":["A.sqlmap","B.BurpSuite","C.Photoshop","D.Nmap"],"answer":"C","analysis":"Photoshop 是图像处理软件，不是渗透测试工具。","category":"SQL注入"},
{"id":"单选题49","type":"单选题","question":"单选题49、在进行布尔盲注时，以下哪个表达式可以判断数据库名第一个字符的 ASCII 值是否为 115？","options":["A.and ascii(substr(database(),1,1))=115","B.and substr(database(),1,1)>115","C.and length(database())=1","D.and database() like '%s%'"],"answer":"A","analysis":"通过 ascii(substr(database(),1,1))=115 可以判断数据库名第一个字符的 ASCII 值是否为 115。","category":"SQL注入"},
{"id":"单选题50","type":"单选题","question":"单选题50、sqlmap 中--dump 参数的作用是？","options":["A.转储指定表的数据","B.删除表","C.获取数据库列表","D.检测注入点"],"answer":"A","analysis":"--dump 参数用于转储指定表的数据。","category":"SQL注入"},
{"id":"多选题1","type":"多选题","question":"多选题1、以下哪些属于SQL注入的类型？","options":["A.数字型注入","B.字符型注入","C.XSS注入","D.搜索型注入"],"answer":["A","B","D"],"analysis":"XSS注入属于跨站脚本攻击，不属于SQL注入。","category":"SQL注入"},
{"id":"多选题2","type":"多选题","question":"多选题2、以下哪些是MySQL的注释方式？","options":["A.--","B.#","C./* */","D.//"],"answer":["A","B","C"],"analysis":"//不是MySQL的注释符。","category":"SQL注入"},
{"id":"多选题3","type":"多选题","question":"多选题3、以下哪些是SQLmap支持的注入技术？","options":["A.布尔盲注","B.时间盲注","C.报错注入","D.联合查询注入"],"answer":["A","B","C","D"],"analysis":"sqlmap支持多种注入技术。","category":"SQL注入"},
{"id":"多选题4","type":"多选题","question":"多选题4、以下哪些函数可以用于盲注？","options":["A.substr()","B.ascii()","C.sleep()","D.length()"],"answer":["A","B","C","D"],"analysis":"盲注常用函数包括substr()、ascii()、sleep()、length()等。","category":"SQL注入"},
{"id":"多选题5","type":"多选题","question":"多选题5、以下哪些是防御SQL注入的有效手段？","options":["A.预编译语句","B.输入过滤","C.最小权限原则","D.使用HTTPS"],"answer":["A","B","C"],"analysis":"HTTPS只能加密传输数据，不能防止SQL注入。","category":"SQL注入"},
{"id":"多选题6","type":"多选题","question":"多选题6、以下哪些属于报错注入的常用函数？","options":["A.extractvalue()","B.updatexml()","C.floor()","D.version()"],"answer":["A","B","C"],"analysis":"version()只是获取版本信息的函数。","category":"SQL注入"},
{"id":"多选题7","type":"多选题","question":"多选题7、SQL注入的危害包括哪些？","options":["A.数据泄露","B.数据篡改","C.服务器被控制","D.网络拥塞"],"answer":["A","B","C"],"analysis":"网络拥塞是DDoS攻击的特点，不是SQL注入的直接危害。","category":"SQL注入"},
{"id":"多选题8","type":"多选题","question":"多选题8、以下哪些是sqli-labs包含的注入类型？","options":["A.GET注入","B.POST注入","C.Header注入","D.盲注"],"answer":["A","B","C","D"],"analysis":"sqli-labs包含多种注入类型的练习关卡。","category":"SQL注入"},
{"id":"多选题9","type":"多选题","question":"多选题9、以下哪些可以用于判断SQL注入点？","options":["A.单引号测试","B.and 1=1测试","C.sleep()测试","D.端口扫描"],"answer":["A","B","C"],"analysis":"端口扫描是网络探测技术，不能判断注入点。","category":"SQL注入"},
{"id":"多选题10","type":"多选题","question":"多选题10、以下哪些属于Union注入的步骤？","options":["A.判断列数","B.判断显示位","C.获取数据库名","D.修改密码"],"answer":["A","B","C"],"analysis":"修改密码不是注入步骤。","category":"SQL注入"},
{"id":"多选题11","type":"多选题","question":"多选题11、以下哪些是字符型注入的闭合方式？","options":["A.单引号","B.双引号","C.括号","D.反斜杠"],"answer":["A","B","C"],"analysis":"反斜杠是转义字符，不是闭合方式。","category":"SQL注入"},
{"id":"多选题12","type":"多选题","question":"多选题12、以下哪些是BurpSuite的功能模块？","options":["A.Proxy","B.Repeater","C.Intruder","D.Scanner"],"answer":["A","B","C","D"],"analysis":"BurpSuite包含多个功能模块。","category":"SQL注入"},
{"id":"多选题13","type":"多选题","question":"多选题13、以下哪些可以用于Cookie注入？","options":["A.修改Cookie中的参数值","B.使用JavaScript注入","C.使用BurpSuite抓包修改","D.使用sqlmap的--cookie参数"],"answer":["A","C","D"],"analysis":"JavaScript注入属于XSS攻击。","category":"SQL注入"},
{"id":"多选题14","type":"多选题","question":"多选题14、以下哪些是WAF绕过的常见方法？","options":["A.大小写混合","B.双写关键字","C.编码绕过","D.内联注释"],"answer":["A","B","C","D"],"analysis":"WAF绕过技术包括大小写混合、双写关键字、编码绕过、内联注释等。","category":"数据库防火墙"},
{"id":"多选题15","type":"多选题","question":"多选题15、以下哪些是数据库安全审计的内容？","options":["A.用户登录记录","B.SQL执行日志","C.权限变更记录","D.数据修改记录"],"answer":["A","B","C","D"],"analysis":"数据库安全审计包括用户登录记录、SQL执行日志、权限变更记录、数据修改记录等。","category":"审计日志"},
{"id":"多选题16","type":"多选题","question":"多选题16、以下哪些是MySQL中用于提权的函数或特性？","options":["A.load_file()","B.into outfile","C.xp_cmdshell","D.UDF自定义函数"],"answer":["A","B","D"],"analysis":"xp_cmdshell是SQL Server的功能。","category":"SQL注入"},
{"id":"多选题17","type":"多选题","question":"多选题17、以下哪些是数据库中间件可能带来的安全风险？","options":["A.SQL注入","B.权限绕过","C.信息泄露","D.拒绝服务"],"answer":["A","B","C","D"],"analysis":"数据库中间件可能带来多种安全风险。","category":"数据库防火墙"},
{"id":"多选题18","type":"多选题","question":"多选题18、以下哪些是sqlmap的常用参数？","options":["A.-u（指定URL）","B.--dbs（列举数据库）","C.--tables（列举表）","D.--level（设置检测级别）"],"answer":["A","B","C","D"],"analysis":"sqlmap常用参数包括这些选项。","category":"SQL注入"},
{"id":"多选题19","type":"多选题","question":"多选题19、以下哪些属于布尔盲注的常用判断方式？","options":["A.and 1=1页面正常","B.and 1=2页面异常","C.使用sleep()观察延迟","D.页面返回不同内容判断真假"],"answer":["A","B","D"],"analysis":"sleep()是时间盲注的方法。","category":"SQL注入"},
{"id":"多选题20","type":"多选题","question":"多选题20、以下哪些是SQL注入的常见危险函数？","options":["A.load_file()","B.sleep()","C.extractvalue()","D.group_concat()"],"answer":["A","B","C"],"analysis":"group_concat()是数据聚合函数，不算危险函数。","category":"SQL注入"},
{"id":"多选题21","type":"多选题","question":"多选题21、BurpSuite Intruder模块支持哪些攻击模式？","options":["A.Sniper（狙击手）","B.Battering ram（攻城槌）","C.Pitchfork（鱼叉）","D.Cluster bomb（集束炸弹）"],"answer":["A","B","C","D"],"analysis":"BurpSuite Intruder支持四种攻击模式。","category":"SQL注入"},
{"id":"多选题22","type":"多选题","question":"多选题22、以下哪些是进行SQL注入测试前需要了解的信息？","options":["A.目标数据库类型","B.注入点位置","C.服务器操作系统","D.目标网站域名注册时间"],"answer":["A","B","C"],"analysis":"域名注册时间与SQL注入测试无关。","category":"SQL注入"},
{"id":"多选题23","type":"多选题","question":"多选题23、以下哪些情况会导致SQL注入漏洞？","options":["A.使用字符串拼接构造SQL语句","B.未对用户输入进行验证","C.数据库密码复杂度不够","D.错误信息未屏蔽直接显示"],"answer":["A","B","D"],"analysis":"密码复杂度与SQL注入漏洞无关。","category":"SQL注入"},
{"id":"多选题24","type":"多选题","question":"多选题24、以下哪些属于堆叠注入可以执行的操作？","options":["A.插入数据","B.删除表","C.创建用户","D.执行系统命令"],"answer":["A","B","C"],"analysis":"执行系统命令需要额外提权，不是堆叠注入本身的功能。","category":"SQL注入"},
{"id":"多选题25","type":"多选题","question":"多选题25、以下哪些是时间盲注中常用的技术手段？","options":["A.使用sleep()引入延迟","B.使用if()条件判断","C.使用benchmark()引入延迟","D.使用substring()逐字符提取"],"answer":["A","B","C","D"],"analysis":"时间盲注常用技术包括sleep()延迟、if()条件判断、benchmark()延迟、substring()逐字符提取等。","category":"SQL注入"},
{"id":"多选题26","type":"多选题","question":"多选题26、以下哪些是HTTP请求头中可能存在注入点的字段？","options":["A.User-Agent","B.Cookie","C.Referer","D.X-Forwarded-For"],"answer":["A","B","C","D"],"analysis":"HTTP请求头中可能存在注入点的字段包括User-Agent、Cookie、Referer、X-Forwarded-For等。","category":"SQL注入"},
{"id":"多选题27","type":"多选题","question":"多选题27、以下哪些是绕过WAF关键字过滤的方法？","options":["A.使用等价函数替换","B.使用注释分割关键字","C.使用十六进制编码","D.使用URL双重编码"],"answer":["A","B","C","D"],"analysis":"绕过WAF关键字过滤的方法包括等价函数替换、注释分割、十六进制编码、URL双重编码等。","category":"数据库防火墙"},
{"id":"多选题28","type":"多选题","question":"多选题28、以下哪些是联合注入获取数据的步骤？","options":["A.order by判断列数","B.union select确定显示位","C.查询information_schema获取表名","D.从目标表获取数据"],"answer":["A","B","C","D"],"analysis":"联合注入获取数据的步骤包括这些选项。","category":"SQL注入"},
{"id":"多选题29","type":"多选题","question":"多选题29、以下哪些属于数据库加密的方法？","options":["A.透明数据加密TDE","B.列级加密","C.传输层SSL加密","D.应用层加密"],"answer":["A","B","C","D"],"analysis":"数据库加密方法包括透明数据加密、列级加密、传输层SSL加密、应用层加密等。","category":"数据加密"},
{"id":"多选题30","type":"多选题","question":"多选题30、以下哪些是数据库账户安全管理的最佳实践？","options":["A.使用强密码","B.定期更换密码","C.遵循最小权限原则","D.禁止使用root账户运行Web服务"],"answer":["A","B","C","D"],"analysis":"数据库账户安全管理的最佳实践包括这些选项。","category":"访问控制"},
{"id":"多选题31","type":"多选题","question":"多选题31、以下哪些可以作为SQL注入的注入点？","options":["A.URL的GET参数","B.表单的POST数据","C.Cookie值","D.HTTP请求头字段"],"answer":["A","B","C","D"],"analysis":"SQL注入的注入点可以出现在URL参数、POST数据、Cookie值、HTTP请求头字段等位置。","category":"SQL注入"},
{"id":"多选题32","type":"多选题","question":"多选题32、以下哪些是报错注入利用的方式？","options":["A.利用extractvalue()的XPath错误","B.利用updatexml()的XPath错误","C.利用floor()+rand()的主键冲突","D.利用exp()的数值溢出"],"answer":["A","B","C","D"],"analysis":"报错注入可以利用这些方式。","category":"SQL注入"},
{"id":"多选题33","type":"多选题","question":"多选题33、以下哪些是BurpSuite Proxy模块的功能？","options":["A.拦截HTTP/HTTPS请求","B.修改请求参数","C.转发请求","D.记录请求历史"],"answer":["A","B","C","D"],"analysis":"BurpSuite Proxy模块可以拦截、修改、转发请求，记录请求历史。","category":"SQL注入"},
{"id":"多选题34","type":"多选题","question":"多选题34、以下哪些是sqlmap检测注入时常用的注入类型？","options":["A.布尔盲注","B.时间盲注","C.报错注入","D.联合查询注入"],"answer":["A","B","C","D"],"analysis":"sqlmap支持多种注入类型。","category":"SQL注入"},
{"id":"多选题35","type":"多选题","question":"多选题35、以下哪些属于SQL注入漏洞的代码级修复方案？","options":["A.使用预编译语句","B.使用存储过程","C.对输入进行白名单验证","D.使用ORM框架"],"answer":["A","B","C","D"],"analysis":"SQL注入漏洞的代码级修复方案包括这些选项。","category":"SQL注入"},
{"id":"多选题36","type":"多选题","question":"多选题36、以下哪些是布尔盲注和时间盲注的共同点？","options":["A.都不依赖页面直接显示查询结果","B.都需要逐字符提取数据","C.效率比联合注入低","D.都需要使用sleep()函数"],"answer":["A","B","C"],"analysis":"只有时间盲注需要sleep()函数。","category":"SQL注入"},
{"id":"多选题37","type":"多选题","question":"多选题37、以下哪些是MySQL的内置安全函数？","options":["A.MD5()","B.SHA1()","C.AES_ENCRYPT()","D.PASSWORD()"],"answer":["A","B","C","D"],"analysis":"MySQL提供多种内置安全函数。","category":"数据加密"},
{"id":"多选题38","type":"多选题","question":"多选题38、以下哪些是WAF防护SQL注入的手段？","options":["A.正则匹配SQL关键字","B.语义分析","C.机器学习检测异常请求","D.IP黑名单"],"answer":["A","B","C","D"],"analysis":"WAF防护SQL注入的手段包括这些选项。","category":"数据库防火墙"},
{"id":"多选题39","type":"多选题","question":"多选题39、以下哪些是使用sqlmap进行POST注入时可以使用的方式？","options":["A.--data指定POST参数","B.--forms自动提取表单","C.-r指定请求文件","D.--cookie指定认证信息"],"answer":["A","B","C","D"],"analysis":"--cookie用于Cookie注入。","category":"SQL注入"},
{"id":"多选题40","type":"多选题","question":"多选题40、以下哪些属于数据库纵深防御体系的层次？","options":["A.网络层防护","B.应用层防护","C.数据库层防护","D.操作系统层防护"],"answer":["A","B","C","D"],"analysis":"数据库纵深防御体系包括这些层次。","category":"数据库防火墙"},
{"id":"多选题41","type":"多选题","question":"多选题41、以下哪些是MySQL中可以获取系统信息的变量或函数？","options":["A.@@version","B.@@hostname","C.@@datadir","D.@@basedir"],"answer":["A","B","C","D"],"analysis":"MySQL中可以获取系统信息的变量包括这些选项。","category":"SQL注入"},
{"id":"多选题42","type":"多选题","question":"多选题42、以下哪些属于联合注入失败的可能原因？","options":["A.列数不匹配","B.数据类型不匹配","C.UNION关键字被过滤","D.页面无显示位"],"answer":["A","B","C","D"],"analysis":"联合注入失败的原因包括这些选项。","category":"SQL注入"},
{"id":"多选题43","type":"多选题","question":"多选题43、以下哪些是数据库日志的类型？","options":["A.查询日志","B.错误日志","C.二进制日志","D.慢查询日志"],"answer":["A","B","C","D"],"analysis":"数据库日志类型包括这些选项。","category":"审计日志"},
{"id":"多选题44","type":"多选题","question":"多选题44、以下哪些属于SQL注入自动化工具？","options":["A.sqlmap","B.havij","C.jSQL Injection","D.SQLNinja"],"answer":["A","B","C","D"],"analysis":"常见的SQL注入自动化工具包括这些选项。","category":"SQL注入"},
{"id":"多选题45","type":"多选题","question":"多选题45、以下哪些是宽字节注入的利用条件？","options":["A.数据库使用GBK等多字节编码","B.使用addslashes()或magic_quotes进行转义","C.传输数据使用GBK编码","D.数据库连接字符集为GBK"],"answer":["A","B","C","D"],"analysis":"宽字节注入的利用条件包括这些选项。","category":"SQL注入"},
{"id":"多选题46","type":"多选题","question":"多选题46、以下哪些属于BurpSuite中Repeater模块的常见使用场景？","options":["A.手动测试SQL注入payload","B.观察不同参数下的响应差异","C.测试越权漏洞","D.验证漏洞是否存在"],"answer":["A","B","C","D"],"analysis":"Repeater模块常用于这些场景。","category":"SQL注入"},
{"id":"多选题47","type":"多选题","question":"多选题47、以下哪些是数据库备份策略的类型？","options":["A.全量备份","B.增量备份","C.差异备份","D.事务日志备份"],"answer":["A","B","C","D"],"analysis":"数据库备份策略包括这些类型。","category":"备份恢复"},
{"id":"多选题48","type":"多选题","question":"多选题48、以下哪些属于SQL注入中信息收集阶段的目标？","options":["A.获取数据库版本","B.获取当前数据库名","C.获取数据库用户名","D.获取表名和列名"],"answer":["A","B","C","D"],"analysis":"SQL注入信息收集阶段的目标包括这些选项。","category":"SQL注入"},
{"id":"多选题49","type":"多选题","question":"多选题49、以下哪些是堆叠注入的利用场景？","options":["A.修改数据库数据","B.创建新的数据库用户","C.执行存储过程","D.删除数据表"],"answer":["A","B","C","D"],"analysis":"堆叠注入可以用于这些操作。","category":"SQL注入"},
{"id":"多选题50","type":"多选题","question":"多选题50、以下哪些属于SQL注入的回显类型？","options":["A.直接回显（联合注入）","B.错误回显（报错注入）","C.布尔回显（布尔盲注）","D.时间回显（时间盲注）"],"answer":["A","B","C","D"],"analysis":"SQL注入的回显类型包括这些选项。","category":"SQL注入"},
{"id":"判断题1","type":"判断题","question":"判断题1、SQL注入只存在于MySQL数据库中。","answer":false,"analysis":"SQL注入可以存在于任何使用SQL的数据库系统中。","category":"SQL注入"},
{"id":"判断题2","type":"判断题","question":"判断题2、预编译语句可以有效防止SQL注入。","answer":true,"analysis":"预编译语句将SQL语句结构与数据分离。","category":"SQL注入"},
{"id":"判断题3","type":"判断题","question":"判断题3、数字型注入不需要闭合单引号。","answer":true,"analysis":"数字型注入的参数是数字类型，不带引号。","category":"SQL注入"},
{"id":"判断题4","type":"判断题","question":"判断题4、sqlmap只能用于GET方式的注入。","answer":false,"analysis":"sqlmap支持多种注入方式。","category":"SQL注入"},
{"id":"判断题5","type":"判断题","question":"判断题5、盲注比Union注入效率更高。","answer":false,"analysis":"盲注需要逐字符猜测数据，效率远低于Union注入。","category":"SQL注入"},
{"id":"判断题6","type":"判断题","question":"判断题6、使用HTTPS可以防止SQL注入。","answer":false,"analysis":"HTTPS只能加密数据传输，不能防止SQL注入。","category":"SQL注入"},
{"id":"判断题7","type":"判断题","question":"判断题7、BurpSuite的Proxy模块可以拦截和修改HTTP请求。","answer":true,"analysis":"BurpSuite的Proxy模块是一个HTTP代理，可以拦截和修改请求。","category":"SQL注入"},
{"id":"判断题8","type":"判断题","question":"判断题8、宽字节注入只对GBK编码有效。","answer":false,"analysis":"宽字节注入也可以针对其他多字节编码。","category":"SQL注入"},
{"id":"判断题9","type":"判断题","question":"判断题9、WAF可以完全防止所有SQL注入攻击。","answer":false,"analysis":"WAF不能完全防止所有攻击，攻击者可以通过各种绕过技术规避WAF检测。","category":"数据库防火墙"},
{"id":"判断题10","type":"判断题","question":"判断题10、存储过程比预编译语句更安全。","answer":false,"analysis":"存储过程本身也可能存在SQL注入漏洞。","category":"SQL注入"},
{"id":"判断题11","type":"判断题","question":"判断题11、SQL注入漏洞属于OWASP Top 10中的安全风险。","answer":true,"analysis":"SQL注入属于OWASP Top 10中的注入类漏洞。","category":"SQL注入"},
{"id":"判断题12","type":"判断题","question":"判断题12、order by语句只能用于排序查询结果。","answer":false,"analysis":"在SQL注入中，order by常被用于判断查询的列数。","category":"SQL注入"},
{"id":"判断题13","type":"判断题","question":"判断题13、information_schema库存储的是数据库的元数据信息。","answer":true,"analysis":"information_schema存储数据库、表、列等元数据信息。","category":"SQL注入"},
{"id":"判断题14","type":"判断题","question":"判断题14、使用黑名单过滤是防止SQL注入的最佳方案。","answer":false,"analysis":"黑名单过滤容易被绕过，最佳方案是使用预编译语句。","category":"SQL注入"},
{"id":"判断题15","type":"判断题","question":"判断题15、SQL注入只能通过Web页面进行，不能通过其他途径。","answer":false,"analysis":"SQL注入可以通过任何用户可控的输入途径进行。","category":"SQL注入"},
{"id":"判断题16","type":"判断题","question":"判断题16、布尔盲注通过页面响应的真假来逐步获取数据。","answer":true,"analysis":"布尔盲注通过构造条件语句，根据页面返回的不同状态来判断条件是否成立。","category":"SQL注入"},
{"id":"判断题17","type":"判断题","question":"判断题17、sqlmap工具是开源的SQL注入检测工具。","answer":true,"analysis":"sqlmap是开源工具，源代码可以在GitHub上获取。","category":"SQL注入"},
{"id":"判断题18","type":"判断题","question":"判断题18、联合注入需要两个查询语句的列数相同才能使用。","answer":true,"analysis":"UNION要求两个SELECT语句的列数相同且数据类型兼容。","category":"SQL注入"},
{"id":"判断题19","type":"判断题","question":"判断题19、BurpSuite的Intruder模块可以用于暴力破解密码。","answer":true,"analysis":"Intruder模块可以用于自动化测试，包括暴力破解密码。","category":"SQL注入"},
{"id":"判断题20","type":"判断题","question":"判断题20、在时间盲注中，sleep()函数执行时间越长说明注入越成功。","answer":false,"analysis":"sleep()函数的执行时间是固定的，与注入成功与否无关。","category":"SQL注入"},
{"id":"判断题21","type":"判断题","question":"判断题21、堆叠注入可以执行INSERT、UPDATE、DELETE等多种SQL语句。","answer":true,"analysis":"堆叠注入通过分号分隔多条SQL语句。","category":"SQL注入"},
{"id":"判断题22","type":"判断题","question":"判断题22、报错注入要求服务器必须将SQL错误信息返回给页面。","answer":true,"analysis":"报错注入依赖于服务器返回的错误信息来获取数据。","category":"SQL注入"},
{"id":"判断题23","type":"判断题","question":"判断题23、使用存储过程可以完全替代预编译语句防止SQL注入。","answer":false,"analysis":"存储过程本身也可能存在SQL注入漏洞。","category":"SQL注入"},
{"id":"判断题24","type":"判断题","question":"判断题24、SQL注入攻击需要攻击者具备高深的编程知识。","answer":false,"analysis":"SQL注入攻击可以使用自动化工具进行。","category":"SQL注入"},
{"id":"判断题25","type":"判断题","question":"判断题25、information_schema.tables表中存储了所有数据库的表名。","answer":true,"analysis":"information_schema.tables表存储了数据库中所有表的信息。","category":"SQL注入"},
{"id":"判断题26","type":"判断题","question":"判断题26、BurpSuite只能在Kali Linux系统上使用。","answer":false,"analysis":"BurpSuite可以在多种操作系统上使用。","category":"SQL注入"},
{"id":"判断题27","type":"判断题","question":"判断题27、sqlmap中，--level参数值越高，检测越彻底，但速度越慢。","answer":true,"analysis":"--level参数控制检测级别，值越高检测越全面。","category":"SQL注入"},
{"id":"判断题28","type":"判断题","question":"判断题28、所有数据库管理系统都存在SQL注入风险。","answer":true,"analysis":"只要使用SQL且存在用户可控输入，就存在SQL注入风险。","category":"SQL注入"},
{"id":"判断题29","type":"判断题","question":"判断题29、URL编码可以完全绕过所有WAF的SQL注入检测。","answer":false,"analysis":"URL编码可以绕过一些简单的WAF，但不能绕过所有WAF的检测。","category":"数据库防火墙"},
{"id":"判断题30","type":"判断题","question":"判断题30、数字型注入比字符型注入更容易利用。","answer":true,"analysis":"数字型注入不需要闭合引号，通常更容易利用。","category":"SQL注入"},
{"id":"判断题31","type":"判断题","question":"判断题31、SQL注入攻击只会影响数据库中的数据，不会影响操作系统。","answer":false,"analysis":"通过SQL注入可以执行系统命令。","category":"SQL注入"},
{"id":"判断题32","type":"判断题","question":"判断题32、BurpSuite的Repeater模块可以保存和重放HTTP请求。","answer":true,"analysis":"Repeater模块可以保存HTTP请求并随时重放。","category":"SQL注入"},
{"id":"判断题33","type":"判断题","question":"判断题33、联合注入（Union Based）不适用于盲注场景。","answer":true,"analysis":"联合注入需要页面有回显，不适用于盲注场景。","category":"SQL注入"},
{"id":"判断题34","type":"判断题","question":"判断题34、加密数据库密码可以防止SQL注入攻击。","answer":false,"analysis":"加密数据库密码只能保护密码本身，不能防止SQL注入攻击。","category":"SQL注入"},
{"id":"判断题35","type":"判断题","question":"判断题35、MySQL中，#号可以用来注释掉其后的SQL语句。","answer":true,"analysis":"#是MySQL的单行注释符。","category":"SQL注入"},
{"id":"判断题36","type":"判断题","question":"判断题36、SQL注入可以用于绕过Web应用的登录验证。","answer":true,"analysis":"通过SQL注入可以绕过登录验证。","category":"SQL注入"},
{"id":"判断题37","type":"判断题","question":"判断题37、sqlmap的--dbs参数用于获取当前数据库中的所有表名。","answer":false,"analysis":"--dbs参数用于获取所有数据库名称。","category":"SQL注入"},
{"id":"判断题38","type":"判断题","question":"判断题38、BurpSuite的Scanner模块需要Pro版才能使用完整功能。","answer":true,"analysis":"BurpSuite Community版的Scanner功能有限。","category":"SQL注入"},
{"id":"判断题39","type":"判断题","question":"判断题39、在MySQL中，version()函数返回数据库的版本号。","answer":true,"analysis":"version()函数返回MySQL数据库的版本信息。","category":"SQL注入"},
{"id":"判断题40","type":"判断题","question":"判断题40、SQL注入只能针对登录表单进行攻击。","answer":false,"analysis":"SQL注入可以针对任何用户可控的输入位置。","category":"SQL注入"},
{"id":"填空题1","type":"填空题","question":"填空题1、SQL注入中，判断列数通常使用___语句。","answer":"order by","analysis":"order by语句常被用于判断查询的列数。","category":"SQL注入"},
{"id":"填空题2","type":"填空题","question":"填空题2、在MySQL中，获取当前用户名的函数是___。","answer":"user()","analysis":"user()函数返回当前数据库用户名。","category":"SQL注入"},
{"id":"填空题3","type":"填空题","question":"填空题3、BurpSuite中用于重放请求的模块是___。","answer":"Repeater","analysis":"Repeater模块用于手动重放和修改HTTP请求。","category":"SQL注入"},
{"id":"填空题4","type":"填空题","question":"填空题4、SQL注入的英文全称是___。","answer":"SQL Injection","analysis":"SQL Injection是SQL注入的英文名称。","category":"SQL注入"},
{"id":"填空题5","type":"填空题","question":"填空题5、在Union注入中，判断显示位使用的是___语句。","answer":"union select","analysis":"union select语句用于确定哪些列会在页面显示。","category":"SQL注入"},
{"id":"填空题6","type":"填空题","question":"填空题6、盲注中获取字符串长度的函数是___。","answer":"length()","analysis":"length()函数用于获取字符串的长度。","category":"SQL注入"},
{"id":"填空题7","type":"填空题","question":"填空题7、sqlmap中获取所有数据库的参数是___。","answer":"--dbs","analysis":"--dbs参数用于列举所有数据库。","category":"SQL注入"},
{"id":"填空题8","type":"填空题","question":"填空题8、报错注入中extractvalue()函数的第二个参数是___路径。","answer":"XPath","analysis":"extractvalue()函数需要XPath路径作为第二个参数。","category":"SQL注入"},
{"id":"填空题9","type":"填空题","question":"填空题9、HTTP请求中，___方法通常用于提交表单数据。","answer":"POST","analysis":"POST方法常用于提交表单数据。","category":"SQL注入"},
{"id":"填空题10","type":"填空题","question":"填空题10、DNS外带注入需要攻击者拥有一个可控的___服务器。","answer":"DNS","analysis":"DNS外带注入需要攻击者拥有一个可控的DNS服务器。","category":"SQL注入"},
{"id":"填空题11","type":"填空题","question":"填空题11、在MySQL中，@@datadir变量存储的是数据库的___路径。","answer":"数据存储","analysis":"@@datadir变量存储MySQL数据文件的存储路径。","category":"SQL注入"},
{"id":"填空题12","type":"填空题","question":"填空题12、sqlmap中指定注入技术的参数是___。","answer":"--technique","analysis":"--technique参数用于指定注入技术类型。","category":"SQL注入"},
{"id":"填空题13","type":"填空题","question":"填空题13、布尔盲注中，页面正常返回表示条件为___。","answer":"真","analysis":"布尔盲注中，条件为真时页面正常返回。","category":"SQL注入"},
{"id":"填空题14","type":"填空题","question":"填空题14、在MySQL5.0以上版本中，___库存储了所有数据库和表的结构信息。","answer":"information_schema","analysis":"information_schema库存储数据库元数据信息。","category":"SQL注入"},
{"id":"填空题15","type":"填空题","question":"填空题15、sqlmap中获取当前数据库名的参数是___。","answer":"--current-db","analysis":"--current-db参数用于获取当前数据库名称。","category":"SQL注入"},
{"id":"填空题16","type":"填空题","question":"填空题16、BurpSuite中用于暴力破解的模块是___。","answer":"Intruder","analysis":"Intruder模块用于自动化暴力破解和模糊测试。","category":"SQL注入"},
{"id":"填空题17","type":"填空题","question":"填空题17、在SQL注入中，___函数可以将多行数据合并为一行显示。","answer":"group_concat()","analysis":"group_concat()函数用于将分组中的多行数据合并为一行。","category":"SQL注入"},
{"id":"填空题18","type":"填空题","question":"填空题18、WAF的全称是___（英文）。","answer":"Web Application Firewall","analysis":"Web Application Firewall是Web应用防火墙的英文全称。","category":"数据库防火墙"},
{"id":"填空题19","type":"填空题","question":"填空题19、BurpSuite 的代理监听默认端口是___。","answer":"8080","analysis":"BurpSuite默认监听8080端口作为代理端口。","category":"SQL注入"},
{"id":"填空题20","type":"填空题","question":"填空题20、___注入是指先将恶意数据存入数据库，再在其他页面触发的注入方式。","answer":"二次","analysis":"二次注入需要先存储恶意数据，再在后续操作中触发。","category":"SQL注入"},
{"id":"填空题21","type":"填空题","question":"填空题21、在MySQL中，获取数据库版本的函数是___。","answer":"version()","analysis":"version()函数返回MySQL数据库的版本信息。","category":"SQL注入"},
{"id":"填空题22","type":"填空题","question":"填空题22、时间盲注中，MySQL常用___函数引入延迟。","answer":"sleep()","analysis":"sleep()函数用于在MySQL中引入时间延迟。","category":"SQL注入"},
{"id":"填空题23","type":"填空题","question":"填空题23、sqlmap指定目标URL的参数是___。","answer":"-u","analysis":"-u参数用于指定目标URL。","category":"SQL注入"},
{"id":"填空题24","type":"填空题","question":"填空题24、在联合注入中，两个SELECT语句的___必须相同。","answer":"列数","analysis":"联合注入要求两个SELECT语句的列数必须一致。","category":"SQL注入"},
{"id":"填空题25","type":"填空题","question":"填空题25、布尔盲注使用___函数逐字节提取字符数据。","answer":"substr()或mid()","analysis":"substr()或mid()函数用于截取字符串。","category":"SQL注入"},
{"id":"填空题26","type":"填空题","question":"填空题26、SQL注入测试中，添加单引号'观察是否___，是判断注入点的常用方法。","answer":"报错","analysis":"添加单引号观察报错是判断注入点的常用方法。","category":"SQL注入"},
{"id":"填空题27","type":"填空题","question":"填空题27、sqlmap中获取指定数据库所有表的参数是___。","answer":"--tables","analysis":"--tables参数用于列举当前数据库中的表。","category":"SQL注入"},
{"id":"填空题28","type":"填空题","question":"填空题28、BurpSuite中用于对数据进行编解码的模块是___。","answer":"Decoder","analysis":"Decoder模块用于对数据进行编解码。","category":"SQL注入"},
{"id":"填空题29","type":"填空题","question":"填空题29、在MySQL中，ASCII码115对应的字母是___。","answer":"s","analysis":"ASCII码115对应小写字母s。","category":"SQL注入"},
{"id":"填空题30","type":"填空题","question":"填空题30、SQL注入中，数字型注入的参数类型是___类型。","answer":"整数（数字）","analysis":"数字型注入的参数是数字类型。","category":"SQL注入"},
{"id":"填空题31","type":"填空题","question":"填空题31、sqlmap中获取指定表所有列名的参数是___。","answer":"--columns","analysis":"--columns参数用于获取表的列名。","category":"SQL注入"},
{"id":"填空题32","type":"填空题","question":"填空题32、BurpSuite拦截HTTPS需要在浏览器中安装BurpSuite的___证书。","answer":"CA","analysis":"BurpSuite需要安装CA证书才能拦截HTTPS流量。","category":"SQL注入"},
{"id":"填空题33","type":"填空题","question":"填空题33、SQL注入防御中，___查询（参数化查询）是最根本的防御措施。","answer":"预编译（参数化）","analysis":"预编译语句是防止SQL注入的最佳实践。","category":"SQL注入"},
{"id":"填空题34","type":"填空题","question":"填空题34、时间盲注判断条件真假的依据是___的长短。","answer":"响应时间","analysis":"时间盲注通过响应时间差异判断条件真假。","category":"SQL注入"},
{"id":"填空题35","type":"填空题","question":"填空题35、在堆叠注入中，多条SQL语句之间使用___符号分隔。","answer":"分号;","analysis":"堆叠注入使用分号分隔多条SQL语句。","category":"SQL注入"},
{"id":"填空题36","type":"填空题","question":"填空题36、sqlmap中转储（导出）数据的参数是___。","answer":"--dump","analysis":"--dump参数用于导出数据。","category":"SQL注入"},
{"id":"填空题37","type":"填空题","question":"填空题37、宽字节注入主要针对___编码的数据库。","answer":"GBK","analysis":"宽字节注入主要利用GBK编码的特性。","category":"SQL注入"},
{"id":"填空题38","type":"填空题","question":"填空题38、在报错注入中，updatexml()函数的第二个参数需要是___格式。","answer":"XPath","analysis":"updatexml()函数需要XPath格式的参数。","category":"SQL注入"},
{"id":"填空题39","type":"填空题","question":"填空题39、sqlmap中设置HTTP请求延迟时间（秒）的参数是___。","answer":"--delay","analysis":"--delay参数用于设置请求延迟。","category":"SQL注入"},
{"id":"填空题40","type":"填空题","question":"填空题40、SQL注入中，and 1=___会让查询条件永远为假，页面异常。","answer":"2","analysis":"and 1=2会让条件永远为假。","category":"SQL注入"},
{"id":"填空题41","type":"填空题","question":"填空题41、在MySQL中，information_schema.___表存储了所有数据库的表名。","answer":"tables","analysis":"information_schema.tables存储数据库表名信息。","category":"SQL注入"},
{"id":"简答题1","type":"简答题","question":"简答题1、简述SQL注入攻击的原理。","answer":"SQL注入攻击的原理是：攻击者通过在应用程序的输入点（如URL参数、表单字段、Cookie等）插入恶意的SQL代码片段，使这些代码被拼接到应用程序的SQL查询语句中，并被数据库服务器执行。由于应用程序没有对用户输入进行充分的验证和过滤，导致攻击者可以绕过身份验证、获取敏感数据、修改数据库内容甚至控制服务器。","analysis":"SQL注入的核心在于输入验证不足和SQL语句的字符串拼接。","category":"SQL注入"},
{"id":"简答题2","type":"简答题","question":"简答题2、简述数字型注入和字符型注入的区别。","answer":"数字型注入的参数是数字类型，SQL语句中该参数不带引号，注入时不需要闭合引号，直接在参数后添加SQL语句即可；字符型注入的参数是字符串类型，SQL语句中该参数带有引号，注入时需要先用单引号或双引号闭合原有的引号，再添加SQL语句，最后还需要注释掉后面多余的引号。判断方法：在参数后加单引号，如果报错则可能是字符型注入，如不报错则可能是数字型注入。","analysis":"数字型和字符型注入的主要区别在于参数类型和引号处理。","category":"SQL注入"},
{"id":"简答题3","type":"简答题","question":"简答题3、简述Union联合注入的基本步骤。","answer":"Union注入的基本步骤：①判断注入点，通过添加单引号或and 1=1/and 1=2判断是否存在注入；②判断列数，使用order by 1,2,3...逐步增加数字直到报错，报错前的数字即为列数；③判断显示位，使用union select 1,2,3...确定哪些列的数据会在页面显示；④获取数据库名，在显示位替换为database()等函数；⑤获取表名，查询information_schema.tables；⑥获取列名，查询information_schema.columns；⑦获取目标数据。","analysis":"Union联合注入需要按照步骤逐步进行。","category":"SQL注入"},
{"id":"简答题4","type":"简答题","question":"简答题4、简述布尔盲注的原理和常用函数。","answer":"布尔盲注的原理是：当页面不直接显示查询结果，但会根据查询条件的真假返回不同页面内容时，攻击者通过构造条件表达式，根据页面返回的差异来判断条件是否成立，从而逐字符获取数据。常用函数包括：length()获取字符串长度、substr()/mid()截取字符串、ascii()/ord()获取字符ASCII码值、left()从左侧截取字符串。通过不断二分猜测每个字符的ASCII码值，逐步还原完整数据。","analysis":"布尔盲注依赖于页面响应差异来判断条件真假。","category":"SQL注入"},
{"id":"简答题5","type":"简答题","question":"简答题5、简述时间盲注的原理。","answer":"时间盲注的原理是：当页面无论查询条件真假都返回相同内容时，攻击者通过在SQL语句中嵌入时间延迟函数（MySQL中为sleep()），根据页面响应时间来判断条件是否成立。如果条件为真则执行sleep()导致响应延迟，如果条件为假则立即响应。通过逐字符构造条件表达式，结合if(条件,sleep(N),0)格式，观察响应时间来逐步获取数据库中的数据。","analysis":"时间盲注通过响应时间差异来判断条件真假。","category":"SQL注入"},
{"id":"简答题6","type":"简答题","question":"简答题6、简述sqlmap工具的基本使用方法。","answer":"sqlmap基本使用方法：①检测注入点：sqlmap -u '目标URL'；②获取数据库列表：sqlmap -u 'URL' --dbs；③获取指定数据库的表：sqlmap -u 'URL' -D 数据库名 --tables；④获取指定表的列：sqlmap -u 'URL' -D 数据库名 -T 表名 --columns；⑤获取数据：sqlmap -u 'URL' -D 数据库名 -T 表名 -C 列名 --dump；⑥POST注入：sqlmap -u 'URL' --data '参数'；⑦Cookie注入：sqlmap -u 'URL' --cookie 'cookie值'。","analysis":"sqlmap是最常用的SQL注入自动化工具。","category":"SQL注入"},
{"id":"简答题7","type":"简答题","question":"简答题7、简述BurpSuite在SQL注入测试中的作用。","answer":"BurpSuite在SQL注入测试中的主要作用：①Proxy模块：拦截浏览器和服务器之间的HTTP/HTTPS请求，可修改请求参数进行注入测试；②Repeater模块：对拦截的请求进行重放和修改，手动测试各种注入payload，观察响应差异；③Intruder模块：自动化批量测试，对参数进行字典攻击，批量测试注入payload；④Scanner模块：自动扫描Web应用漏洞（Pro版）；⑤Decoder模块：对编码数据进行解码和编码转换，如URL解码等。","analysis":"BurpSuite是Web安全测试的必备工具。","category":"SQL注入"},
{"id":"简答题8","type":"简答题","question":"简答题8、简述WAF绕过的常见方法。","answer":"WAF绕过的常见方法：①大小写混合：将SQL关键字用不同大小写混合，如SeLeCt；②双写关键字：如selselectect，WAF过滤一次后剩余select；③编码绕过：使用URL编码、Unicode编码、十六进制编码等；④内联注释：MySQL中可以使用un/**/ion的方式分割关键字；⑤等价函数替换：用substr()替换mid()等；⑥空白符替换：使用%09、%0a等特殊空白字符替代普通空格；⑦参数污染：利用服务器对重复参数的不同处理方式。","analysis":"WAF绕过需要了解WAF的检测规则。","category":"数据库防火墙"},
{"id":"简答题9","type":"简答题","question":"简答题9、简述预编译语句防止SQL注入的原理。","answer":"预编译语句防止SQL注入的原理是将SQL查询的结构和数据分离。执行预编译语句时，首先数据库服务器对SQL语句进行编译，确定查询结构（如SELECT * FROM users WHERE id=?），此时查询结构已固定；然后再将参数绑定到占位符上，绑定的参数只被当作数据处理，不会被解释为SQL命令。因此，即使参数中包含SQL关键字或特殊字符，也不会改变查询结构，从根本上防止了SQL注入攻击。","analysis":"预编译语句是防止SQL注入的最佳实践。","category":"SQL注入"},
{"id":"简答题10","type":"简答题","question":"简答题10、简述二次注入的原理和防范方法。","answer":"二次注入的原理：攻击者首先将含有SQL恶意代码的数据存入数据库，第一次写入时经过转义处理不触发注入；当这些数据被读取并用于构造新SQL查询时，由于不再转义，恶意代码被当作SQL命令执行。防范方法：①对所有从数据库读取的数据也进行验证和过滤；②统一使用预编译语句；③对输出数据进行编码处理；④遵循最小权限原则限制数据库用户权限；⑤进行完整的代码安全审计。","analysis":"二次注入需要两次请求才能完成攻击。","category":"SQL注入"},
{"id":"简答题11","type":"简答题","question":"简答题11、简述宽字节注入的原理。","answer":"宽字节注入的原理是：当数据库使用GBK等多字节编码时，一个字符由两个字节组成。PHP的addslashes()函数会在单引号前添加反斜杠（0x5c）。如果攻击者在单引号前发送0xbf等字节，在GBK编码下0xbf5c会被解析为一个中文字符，从而'消耗'掉反斜杠，使单引号成功逃逸，从而实现注入。防范方法：使用UTF-8编码；使用mysql_real_escape_string()而非addslashes()；设置数据库连接字符集。","analysis":"宽字节注入利用了多字节编码的特性。","category":"SQL注入"},
{"id":"简答题12","type":"简答题","question":"简答题12、简述DNS外带注入的原理。","answer":"DNS外带注入的原理是：当目标服务器无直接回显时，利用数据库的特殊函数（如MySQL的load_file()，SQL Server的xp_dirtree()等）发起DNS查询，将要获取的数据作为DNS查询的子域名，发送到攻击者控制的DNS服务器。攻击者通过查看DNS服务器的查询日志获取被查询的数据。这种方式能绕过无回显限制，可以快速提取数据，比传统盲注效率高得多，但需要数据库用户具有足够权限且目标服务器能发出DNS请求。","analysis":"DNS外带注入是一种高效的数据提取技术。","category":"SQL注入"},
{"id":"简答题13","type":"简答题","question":"简答题13、简述sqli-labs靶场的结构和用途。","answer":"sqli-labs是专门用于学习SQL注入的靶场平台，包含65个不同难度的关卡，覆盖各种SQL注入类型：Less 1-22为GET/POST方式注入，Less 23-37为各种绕过方式，Less 38-53为堆叠查询，Less 54-65为挑战关卡。用途：①学习各种SQL注入技术的原理和实操；②练习sqlmap等工具的使用；③理解不同防御措施和绕过方法；④作为安全培训和教学平台。每关都有不同的注入技巧和知识点，难度循序渐进，适合从入门到进阶的学习。","analysis":"sqli-labs是学习SQL注入的最佳练习平台。","category":"SQL注入"},
{"id":"简答题14","type":"简答题","question":"简答题14、简述HTTP Header注入的常见位置和检测方法。","answer":"HTTP Header注入的常见位置：①User-Agent头：存储浏览器信息；②Cookie头：存储会话信息；③Referer头：记录来源页面；④X-Forwarded-For头：记录客户端IP；⑤Accept头：声明可接受的内容类型。检测方法：①使用BurpSuite拦截请求，在Header字段中添加单引号观察是否报错；②在Header值中添加and 1=1/and 1=2对比响应差异；③使用sqlmap的--level参数设为3及以上，自动检测Header注入；④使用sleep()函数测试是否有时间延迟。","analysis":"HTTP Header注入发生在请求头的各个字段中。","category":"SQL注入"},
{"id":"简答题15","type":"简答题","question":"简答题15、简述数据库安全的纵深防御体系应包含哪些层面。","answer":"数据库安全的纵深防御体系应包含：①网络层：使用防火墙限制数据库端口访问，部署WAF拦截SQL注入，使用VPN或专线访问数据库；②应用层：使用预编译语句，实施输入验证和过滤，采用参数化查询，使用ORM框架；③数据库层：最小权限原则分配用户权限，启用审计日志，使用透明数据加密，定期更新补丁；④操作系统层：限制操作系统权限，关闭不必要的服务，使用入侵检测系统；⑤管理层：制定安全策略，定期进行安全评估和渗透测试，开展安全培训，建立应急响应机制。","analysis":"数据库安全需要多层次的纵深防御体系。","category":"数据库防火墙"},
{"id":"简答题16","type":"简答题","question":"简答题16、简述Cookie注入的原理和步骤。","answer":"Cookie注入原理：当Web应用从Cookie中读取参数值并用于构造SQL查询，且未对Cookie值进行过滤时，攻击者可通过修改Cookie中的参数值来注入SQL代码。步骤：①正常访问页面，使用BurpSuite拦截请求获取Cookie内容；②分析Cookie参数，识别可能的注入点（如id=1等）；③在Cookie参数值中添加单引号，观察页面是否报错；④使用and 1=1和and 1=2判断注入类型；⑤构造注入payload（联合注入或盲注）获取数据；⑥也可使用sqlmap的--cookie参数进行自动化注入测试。","analysis":"Cookie注入是一种特殊的注入方式。","category":"SQL注入"},
{"id":"简答题17","type":"简答题","question":"简答题17、简述报错注入的原理及常用函数。","answer":"报错注入的原理是：当应用程序将数据库错误信息直接返回给页面时，攻击者通过构造特殊SQL语句，故意触发数据库错误，并在错误信息中包含所需查询的数据。常用函数：①extractvalue(1,concat(0x7e,SQL语句))：通过XPath路径格式错误将查询结果包含在报错信息中；②updatexml(1,concat(0x7e,SQL语句),1)：原理同上；③floor()+rand()：通过主键重复引起报错；④exp()：通过数值溢出引起报错。注意：单次extractvalue/updatexml报错最多返回32个字符的数据。","analysis":"报错注入利用数据库错误信息回显数据。","category":"SQL注入"},
{"id":"简答题18","type":"简答题","question":"简答题18、简述堆叠注入的原理及使用场景。","answer":"堆叠注入原理：通过在SQL语句中添加分号(;)来结束当前查询语句，然后紧跟新的SQL语句，使数据库执行多条SQL命令。使用场景：①修改数据：可以执行INSERT/UPDATE/DELETE操作；②创建数据库对象：可以创建表、视图、存储过程；③权限操作：可以创建数据库用户或授权；④执行系统命令（结合xp_cmdshell等）。限制：并非所有数据库都支持（Oracle不支持）；需要应用程序使用支持多语句执行的API；通常用于数字型或可闭合的字符型注入场景；WAF通常会拦截分号。","analysis":"堆叠注入可以执行多条SQL语句。","category":"SQL注入"},
{"id":"简答题19","type":"简答题","question":"简答题19、简述数据库备份策略在安全中的重要性。","answer":"数据库备份策略在安全中的重要性体现在：①数据恢复：当数据库遭受SQL注入攻击导致数据被篡改或删除时，备份是恢复数据的唯一可靠手段；②业务连续性：定期备份确保系统在遭受攻击后能快速恢复运行；③合规要求：许多安全法规要求对敏感数据进行定期备份；④审计追踪：备份数据可作为安全事件的取证材料；⑤灾难恢复：应对硬件故障，自然灾害等意外情况。备份策略应包括全量备份、增量备份、差异备份的组合，以及定期验证备份数据的可恢复性。","analysis":"数据库备份是安全防护的重要组成部分。","category":"备份恢复"},
{"id":"简答题20","type":"简答题","question":"简答题20、简述如何判断一个URL参数是否存在SQL注入漏洞。","answer":"判断URL参数是否存在SQL注入漏洞的方法：①基础测试：在参数后添加单引号'，如果页面报错或显示异常，可能存在注入；②逻辑测试：分别添加'and 1=1--和'and 1=2--，如果前者页面正常、后者页面异常，则存在注入；③时间测试：添加'and sleep(5)--，如果响应延迟5秒，存在时间盲注；④数值测试：对数字型参数，将1改为2-1，如果结果与1相同，可能存在注入；⑤工具测试：使用sqlmap -u 'URL'自动检测。发现后应立即停止测试，在授权范围内记录漏洞信息。","analysis":"SQL注入检测需要综合多种方法。","category":"SQL注入"}
        ];

        // 知识库 - 知识讲解库
        const knowledgeBase = {
            "SQL注入": {
                basic: [
                    "SQL注入是一种代码注入技术，攻击者通过在应用程序的输入点插入恶意SQL代码来攻击数据库",
                    "SQL注入的本质是把用户输入的输入作为SQL命令的一部分执行",
                    "SQL注入可以导致数据泄露、数据篡改、服务器被控制等严重后果"
                ],
                extend: [
                    "现代Web应用框架（如使用ORM框架）可以有效防止大多数SQL注入",
                    "SQL注入按注入类型可分为：数字型、字符型、搜索型、盲注等",
                    "OWASP Top 10一直将SQL注入列为最危险的Web漏洞之一"
                ]
            },
            "联合注入": {
                basic: [
                    "联合注入使用UNION关键字合并两个或多个SELECT语句的结果",
                    "联合注入要求前后两个SELECT语句必须有相同的列数和兼容的数据类型",
                    "联合注入步骤：判断列数、确定显示位、获取数据库名、获取表名、获取列名、获取数据"
                ],
                extend: [
                    "UNION ALL可以获取额外的查询结果，UNION DISTINCT（默认）会去重",
                    "联合注入适合页面有数据回显时使用",
                    "可以使用NULL填充列保持列数判断"
                ]
            },
            "盲注": {
                basic: [
                    "盲注分为布尔盲注和时间盲注，当页面不直接显示查询结果时使用",
                    "布尔盲注根据页面响应的真假来判断条件是否成立",
                    "时间盲注通过观察页面响应时间判断条件是否成立"
                ],
                extend: [
                    "盲注通常通过二分查找法提高效率",
                    "布尔盲注常用函数：length()、substr()、ascii()、ord()",
                    "时间盲注常用函数：sleep()、benchmark()"
                ]
            },
            "报错注入": {
                basic: [
                    "报错注入通过故意触发数据库错误，使错误信息包含所需数据",
                    "extractvalue()和updatexml()是常用的报错注入函数",
                    "报错注入需要应用程序返回数据库错误信息"
                ],
                extend: [
                    "extractvalue()和updatexml()通过XPath路径格式错误触发",
                    "floor()+rand()通过主键冲突触发报错",
                    "exp()通过数值溢出触发报错",
                    "报错注入单次最多只能返回32个字符"
                ]
            },
            "sqlmap": {
                basic: [
                    "sqlmap是一个开源的SQL注入检测和利用工具",
                    "常用参数：-u指定URL，--dbs获取所有数据库，--tables获取所有表，--dump导出数据",
                    "sqlmap支持多种数据库（MySQL、MSSQL、Oracle等）"
                ],
                extend: [
                    "--level设置检测级别，越高越全面但越慢",
                    "--risk设置风险级别",
                    "--technique指定注入技术",
                    "sqlmap可以自动识别注入类型"
                ]
            },
            "BurpSuite": {
                basic: [
                    "BurpSuite是Web应用安全测试工具",
                    "Proxy模块拦截和修改HTTP请求",
                    "Repeater模块重放和修改HTTP请求",
                    "Intruder模块自动化暴力破解和模糊测试"
                ],
                extend: [
                    "Community版Scanner功能有限，Pro版功能完整",
                    "Decoder模块进行编码和解码",
                    "Comparer模块比较两个请求或响应",
                    "需要安装CA证书才能拦截HTTPS"
                ]
            },
            "数据库防火墙": {
                basic: [
                    "WAF全称是Web应用防火墙",
                    "WAF可以检测和拦截SQL注入攻击",
                    "WAF绕过方法包括大小写混合、双写关键字、编码绕过、内联注释等"
                ],
                extend: [
                    "WAF按部署方式：网络层、应用层、云WAF",
                    "现代WAF使用机器学习检测异常",
                    "WAF不能替代代码级防御"
                ]
            }
        };
        
        // 评分标准
        const scoringRules = {
            excellent: { min: 80, label: "优秀", color: "#10B981", feedback: "掌握得很好！继续保持！" },
            good: { min: 60, label: "良好", color: "#F59E0B", feedback: "表现不错！还有提升空间。" },
            needImprove: { min: 0, label: "需改进", color: "#EF4444", feedback: "需要加强学习这部分知识。" }
        };

        // 关键词评分系统
        // 【判分逻辑】简答题评分：基于关键词匹配率和答案长度计算最终得分
        function calculateEssayScore(userAnswer, standardAnswer, question) {
            let score = 0;
            let details = [];
            
            // 提取标准答案关键词
            const keywords = extractKeywords(standardAnswer);
            let matchedCount = 0;
            
            keywords.forEach(function(keyword) {
                if (userAnswer.toLowerCase().includes(keyword.toLowerCase())) {
                    matchedCount++;
                    details.push('✓ 包含关键词："' + keyword + '"');
                }
            });
            
            const keywordScore = Math.round((matchedCount / Math.max(keywords.length, 1)) * 60);
            
            // 长度评分
            const lengthScore = Math.min(40, userAnswer.length / 10);
            
            score = Math.min(100, Math.round(keywordScore + lengthScore));
            
            return {
                score: score,
                details: details,
                matchedKeywords: matchedCount,
                totalKeywords: keywords.length,
                suggestion: getEssaySuggestion(score, userAnswer, standardAnswer)
            };
        }
        
        function extractKeywords(text) {
            const stopWords = ["的", "是", "在", "和", "了", "也", "都", "而", "及", "与", "或", "但", "如果", "因为", "所以", "因此", "可以", "能够", "使用", "通过", "需要", "进行", "等", "这", "那", "个", "有", "没", "不", "也", "还", "就", "都", "很", "最", "更", "比", "让", "被", "把", "给", "上", "下", "中", "里", "外", "内", "前", "后", "左", "右", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
            const words = text.split(/[,。；、\s]+/);
            const keywords = [];
            
            words.forEach(function(word) {
                if (word.length >= 2 && !stopWords.includes(word)) {
                    keywords.push(word);
                }
            });
            
            const uniqueKeywords = [];
            keywords.forEach(function(word) {
                if (!uniqueKeywords.includes(word)) {
                    uniqueKeywords.push(word);
                }
            });
            
            return uniqueKeywords.slice(0, 10);
        }
        
        function getEssaySuggestion(score, userAnswer, standardAnswer) {
            let suggestions = [];
            
            if (score < 40) {
                suggestions.push("建议先认真阅读课程内容，理解基本概念");
            } else if (score < 70) {
                suggestions.push("建议补充更多相关的细节");
            } else {
                suggestions.push("回答得不错！可以再提升内容更全面");
            }
            
            return suggestions;
        }
        
        // 填空题智能评分
        // 【判分逻辑】填空题评分：通过完全匹配、部分包含和编辑距离进行智能判分
        function calculateFillScore(userAnswer, standardAnswer) {
            const normalizedUser = userAnswer.trim().toLowerCase();
            const normalizedStandard = standardAnswer.trim().toLowerCase();
            
            let score = 0;
            let details = [];
            
            if (normalizedUser === normalizedStandard) {
                score = 100;
                details.push("✓ 答案完全正确");
            } else if (normalizedStandard.includes(normalizedUser) || normalizedUser.includes(normalizedStandard)) {
                score = 70;
                details.push("△ 答案部分正确");
            } else if (levenshteinDistance(normalizedUser, normalizedStandard) <= 2) {
                score = 50;
                details.push("△ 答案接近正确");
            } else {
                score = 0;
                details.push("✗ 答案错误");
            }
            
            return {
                score: score,
                details: details,
                suggestion: score < 70 ? "建议复习相关知识" : "很好！"
            };
        }
        
        // 计算编辑距离
        function levenshteinDistance(a, b) {
            if (a.length === 0) return b.length;
            if (b.length === 0) return a.length;
            
            const matrix = [];
            for (let i = 0; i <= b.length; i++) {
                matrix[i] = [i];
            }
            for (let j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }
            
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) === a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(
                            matrix[i - 1][j - 1] + 1,
                            matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1
                        );
                    }
                }
            }
            
            return matrix[b.length][a.length];
        }
        
        // 获取知识讲解内容
        function getKnowledgeContent(category) {
            let content = "";
            
            const matchedCategory = Object.keys(knowledgeBase).find(function(key) {
                return category.includes(key) || key.includes(category);
            }) || category;
            
            if (knowledgeBase[matchedCategory]) {
                const knowledge = knowledgeBase[matchedCategory];
                
                content = '<div class="knowledge-title">📖 核心概念</div><ul class="knowledge-list">';
                knowledge.basic.forEach(function(item) {
                    content += '<li>' + escapeHtml(item) + '</li>';
                });
                content += '</ul><div class="knowledge-title" style="margin-top: 20px;">🔗 知识延伸</div><ul class="knowledge-list">';
                knowledge.extend.forEach(function(item) {
                    content += '<li>' + escapeHtml(item) + '</li>';
                });
                content += '</ul>';
            } else {
                content = '<div class="knowledge-title">📖 核心概念</div><p style="color: #666; line-height: 1.8;">这部分知识的要点。</p>';
            }
            
            return content;
        }
        
        // 展开/收起知识讲解
        function toggleKnowledge() {
            const content = document.getElementById('knowledge-content');
            const icon = document.getElementById('knowledge-toggle-icon');
            
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.textContent = '▲';
            } else {
                content.style.display = 'none';
                icon.textContent = '▼';
            }
        }
        
        // 获取评分等级
        function getScoreLevel(score) {
            if (score >= scoringRules.excellent.min) return 'excellent';
            if (score >= scoringRules.good.min) return 'good';
            return 'needImprove';
        }

        let currentQuestionIndex = 0;
        let currentMode = 'practice';
        let userAnswers = {};
        let markedQuestions = [];
        let startTime = 0;
        let timerInterval = null;
        let consecutiveCorrect = 0;
        let totalAnswered = 0;
        let totalCorrect = 0;
        let hasSubmittedCurrent = false;
        let autoAdvanceTimer = null;
        
        // 做题留痕数据结构
        const ANSWER_HISTORY_KEY = 'quiz_answer_history';
        const AUTO_ADVANCE_DELAY = 800; // 正确答题后自动跳转延迟（毫秒）
        
        // 获取答题历史
        // 【本地存储】从 localStorage 读取答题历史记录
        function getAnswerHistory() {
            try {
                return JSON.parse(localStorage.getItem(ANSWER_HISTORY_KEY) || '{}');
            } catch (e) {
                console.warn('读取答题历史失败:', e);
                return {};
            }
        }
        
        // 保存答题历史
        // 【本地存储】将答题历史保存到 localStorage
        function saveAnswerHistory(history) {
            try {
                localStorage.setItem(ANSWER_HISTORY_KEY, JSON.stringify(history));
            } catch (e) {
                console.warn('保存答题历史失败:', e);
            }
        }
        
        // 记录答题历史
        // 【本地存储】记录当前题目的作答结果到 localStorage（做题留痕功能）
        function recordAnswerHistory(questionId, userAnswer, isCorrect, scoreResult) {
            const history = getAnswerHistory();
            const question = questions.find(q => q.id === questionId);
            
            history[questionId] = {
                userAnswer: userAnswer,
                isCorrect: isCorrect,
                submitTime: new Date().toISOString(),
                timestamp: Date.now(),
                questionType: question ? question.type : '',
                scoreResult: scoreResult,
                hasViewedAnalysis: true
            };
            
            saveAnswerHistory(history);
        }

        const praiseMessages = [
            '太棒了！继续保持！',
            '非常正确！你真聪明！',
            '答对了！做得好！',
            '完美！继续加油！',
            '优秀！你是最棒的！',
            '太厉害了！再接再厉！'
        ];

        const encouragementMessages = [
            '没关系，再试一次！',
            '加油！你可以的！',
            '别灰心，继续努力！',
            '答错了也没关系，学习就是一个不断尝试的过程！',
            '再接再厉，下次一定能答对！'
        ];

        function speak(text) {
            if ('speechSynthesis' in window && typeof speechSynthesis !== 'undefined') {
                try {
                    speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'zh-CN';
                utterance.rate = 0.9;
                    speechSynthesis.speak(utterance);
                } catch (e) {
                    console.warn('语音播放失败:', e);
                }
            }
        }

        function showPraise() {
            const message = praiseMessages[Math.floor(Math.random() * praiseMessages.length)];
            speak(message);
        }

        function showEncouragement() {
            const message = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
            speak(message);
        }

        function startQuiz(mode) {
            currentMode = mode;
            currentQuestionIndex = 0;
            userAnswers = {};
            markedQuestions = [];
            startTime = Date.now();
            consecutiveCorrect = 0;
            totalAnswered = 0;
            totalCorrect = 0;
            hasSubmittedCurrent = false;
            
            // 清除自动跳转计时器
            if (autoAdvanceTimer) {
                clearTimeout(autoAdvanceTimer);
                autoAdvanceTimer = null;
            }
            
            document.getElementById('home-page').style.display = 'none';
            document.getElementById('quiz-page').style.display = 'block';
            document.getElementById('result-page').style.display = 'none';
            document.getElementById('wrongbook-page').style.display = 'none';
            document.getElementById('stats-page').style.display = 'none';
            
            startTimer();
            showQuestion();
        }

        function startTimer() {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            timerInterval = setInterval(updateTimer, 1000);
        }

        function updateTimer() {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('timer').textContent = '⏱️ ' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        }

        // 【题目渲染】根据 currentQuestionIndex 渲染当前题目、选项和进度条
        function showQuestion() {
            const question = questions[currentQuestionIndex];
            document.getElementById('current-question').textContent = question.id;
            document.getElementById('question-category').textContent = question.category;
            const questionTextEl = document.getElementById('question-text');
            // 去掉题目文本前面的"题型X、"前缀
            let cleanQuestion = question.question;
            // 匹配前面的题型+数字+顿号的模式，如"单选题1、"、"多选题33、"等
            cleanQuestion = cleanQuestion.replace(/^(单选题|多选题|判断题|填空题|简答题)\d+、/, '');
            questionTextEl.innerHTML = escapeHtml(cleanQuestion);
            
            const contentDiv = document.getElementById('question-content');
            // 清理旧的事件监听器
            const oldOptions = contentDiv.querySelectorAll('.option');
            oldOptions.forEach(function(opt) {
                opt.onclick = null;
            });
            contentDiv.innerHTML = '';
            
            // 隐藏所有新增元素（默认状态）
            document.getElementById('analysis').style.display = 'none';
            document.getElementById('knowledge-section').style.display = 'none';
            document.getElementById('knowledge-content').style.display = 'none';
            document.getElementById('score-card').style.display = 'none';
            document.getElementById('error-feedback').style.display = 'none';
            document.getElementById('correct-feedback').style.display = 'none';
            
            // 清除自动跳转计时器
            if (autoAdvanceTimer) {
                clearTimeout(autoAdvanceTimer);
                autoAdvanceTimer = null;
            }
            
            // Reset submission flag for new question
            hasSubmittedCurrent = false;
            
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            document.getElementById('progress-fill').style.width = progress + '%';
            
            // Configure submit button based on question type
            const submitBtn = document.getElementById('submit-btn');
            if (question.type === '多选题') {
                submitBtn.textContent = '确认答案';
                submitBtn.style.opacity = '0.6';
            } else {
                submitBtn.textContent = '提交答案';
                submitBtn.style.opacity = '1';
            }
            
            // 检查是否有答题历史
            const history = getAnswerHistory();
            const questionHistory = history[question.id];
            
            if (question.type === '单选题' || question.type === '多选题') {
                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'options';
                question.options.forEach(function(option, index) {
                    const optionDiv = document.createElement('div');
                    optionDiv.className = 'option';
                    optionDiv.innerHTML = '<span class="option-letter">' + String.fromCharCode(65 + index) + '</span>' + escapeHtml(option.substring(2));
                    optionDiv.onclick = function() { selectOption(index, question.type); };
                    optionsDiv.appendChild(optionDiv);
                });
                contentDiv.appendChild(optionsDiv);
            } else if (question.type === '判断题') {
                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'options';
                ['对', '错'].forEach(function(option, index) {
                    const optionDiv = document.createElement('div');
                    optionDiv.className = 'option';
                    optionDiv.innerHTML = '<span class="option-letter">' + (index === 0 ? '✓' : '✗') + '</span>' + escapeHtml(option);
                    optionDiv.onclick = function() { selectOption(index === 0, question.type); };
                    optionsDiv.appendChild(optionDiv);
                });
                contentDiv.appendChild(optionsDiv);
            } else if (question.type === '填空题') {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'fill-input';
                input.placeholder = '请输入答案';
                input.value = userAnswers[question.id] || '';
                input.oninput = function() { saveAnswer(question.id, input.value); };
                contentDiv.appendChild(input);
            } else if (question.type === '简答题') {
                const textarea = document.createElement('textarea');
                textarea.className = 'essay-input';
                textarea.placeholder = '请输入答案...';
                textarea.value = userAnswers[question.id] || '';
                textarea.oninput = function() { saveAnswer(question.id, textarea.value); };
                contentDiv.appendChild(textarea);
            }
            
            // 如果有答题历史，恢复答题状态
            if (questionHistory) {
                restoreQuestionState(question, questionHistory);
            }
            
            updateMarkButton();
            updateJumpPanel();
        }
        
        // 恢复题目状态（做题留痕功能）
        // 【题目渲染】从 localStorage 恢复已作答题目的状态、答案和反馈信息
        function restoreQuestionState(question, history) {
            hasSubmittedCurrent = true;
            
            // 恢复用户答案到userAnswers
            userAnswers[question.id] = history.userAnswer;
            
            if (question.type === '单选题' || question.type === '多选题' || question.type === '判断题') {
                const options = document.querySelectorAll('.option');
                
                if (question.type === '多选题') {
                    // 恢复多选题选择状态
                    if (Array.isArray(history.userAnswer)) {
                        history.userAnswer.forEach(function(letter) {
                            const index = letter.charCodeAt(0) - 65;
                            if (options[index]) {
                                options[index].classList.add('selected');
                            }
                        });
                    }
                } else if (question.type === '判断题') {
                    // 恢复判断题选择状态
                    const selectedIndex = history.userAnswer === '对' ? 0 : 1;
                    if (options[selectedIndex]) {
                        options[selectedIndex].classList.add('selected');
                    }
                } else {
                    // 恢复单选题选择状态
                    const selectedIndex = history.userAnswer.charCodeAt(0) - 65;
                    if (options[selectedIndex]) {
                        options[selectedIndex].classList.add('selected');
                    }
                }
                
                // 恢复结果展示（正确/错误标识）
                restoreOptionResults(question, options, history);
            } else if (question.type === '填空题' || question.type === '简答题') {
                const input = document.querySelector('.fill-input, .essay-input');
                if (input) {
                    input.value = history.userAnswer;
                }
            }
            
            // 恢复反馈显示
            if (history.isCorrect) {
                document.getElementById('correct-feedback').style.display = 'block';
                document.getElementById('correct-feedback-content').textContent = 
                    question.type === '简答题' || question.type === '填空题' ? 
                    '做得很好！继续保持！' : '回答正确！';
            } else {
                document.getElementById('error-feedback').style.display = 'block';
                document.getElementById('error-feedback-content').textContent = 
                    '这道题答错了，没关系，认真看解析学习！';
            }
            
            // 恢复评分卡片（针对主观题）
            if ((question.type === '填空题' || question.type === '简答题') && history.scoreResult) {
                const scoreLevel = getScoreLevel(history.scoreResult.score);
                const levelInfo = scoringRules[scoreLevel];
                
                document.getElementById('score-card').style.display = 'block';
                document.getElementById('score-value').textContent = history.scoreResult.score;
                document.getElementById('score-value').style.color = levelInfo.color;
                
                const levelElement = document.getElementById('score-level');
                levelElement.textContent = levelInfo.label;
                levelElement.className = 'score-level ' + scoreLevel;
                
                let detailsText = '<p>' + levelInfo.feedback + '</p>';
                
                if (history.scoreResult.details && history.scoreResult.details.length > 0) {
                    detailsText += '<p>' + history.scoreResult.details.map(d => escapeHtml(d)).join('<br>') + '</p>';
                }
                
                document.getElementById('score-details').innerHTML = detailsText;
            }
            
            // 恢复答案解析
            let standardAnswer = (question.type === '多选题') ? question.answer.join(', ') : question.answer;
            document.getElementById('analysis-text').textContent = '标准答案：' + standardAnswer + '\n\n' + question.analysis;
            document.getElementById('analysis').style.display = 'block';
            
            // 恢复知识讲解
            document.getElementById('knowledge-section').style.display = 'block';
            document.getElementById('knowledge-content').innerHTML = getKnowledgeContent(question.category);
            
            // 更新提交按钮状态
            const submitBtn = document.getElementById('submit-btn');
            if (history.isCorrect) {
                submitBtn.textContent = '已正确回答';
                submitBtn.style.opacity = '0.6';
            } else {
                submitBtn.textContent = '已回答（错误）';
                submitBtn.style.opacity = '0.6';
            }
        }
        
        // 恢复选项结果标识
        function restoreOptionResults(question, options, history) {
            if (question.type === '单选题' || question.type === '多选题') {
                options.forEach(function(opt, index) {
                    opt.style.pointerEvents = 'none';
                    const optionLetter = String.fromCharCode(65 + index);
                    
                    if (question.type === '多选题') {
                        if (question.answer.includes(optionLetter)) {
                            opt.classList.add('correct');
                            opt.classList.remove('wrong', 'selected');
                            if (!opt.querySelector('.result-icon')) {
                                const icon = document.createElement('span');
                                icon.className = 'result-icon';
                                icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                                icon.textContent = '✓';
                                opt.appendChild(icon);
                            }
                        } else if (opt.classList.contains('selected')) {
                            opt.classList.add('wrong');
                            if (!opt.querySelector('.result-icon')) {
                                const icon = document.createElement('span');
                                icon.className = 'result-icon';
                                icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                                icon.textContent = '✗';
                                opt.appendChild(icon);
                            }
                        }
                    } else {
                        if (optionLetter === question.answer) {
                            opt.classList.add('correct');
                            if (!opt.querySelector('.result-icon')) {
                                const icon = document.createElement('span');
                                icon.className = 'result-icon';
                                icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                                icon.textContent = '✓';
                                opt.appendChild(icon);
                            }
                        }
                        if (opt.classList.contains('selected') && optionLetter !== question.answer) {
                            opt.classList.add('wrong');
                            if (!opt.querySelector('.result-icon')) {
                                const icon = document.createElement('span');
                                icon.className = 'result-icon';
                                icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                                icon.textContent = '✗';
                                opt.appendChild(icon);
                            }
                        }
                    }
                });
            } else if (question.type === '判断题') {
                options.forEach(function(opt, index) {
                    opt.style.pointerEvents = 'none';
                    const isTrue = index === 0;
                    if (isTrue === question.answer) {
                        opt.classList.add('correct');
                        if (!opt.querySelector('.result-icon')) {
                            const icon = document.createElement('span');
                            icon.className = 'result-icon';
                            icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                            icon.textContent = '✓';
                            opt.appendChild(icon);
                        }
                    }
                    if (opt.classList.contains('selected') && isTrue !== question.answer) {
                        opt.classList.add('wrong');
                        if (!opt.querySelector('.result-icon')) {
                            const icon = document.createElement('span');
                            icon.className = 'result-icon';
                            icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                            icon.textContent = '✗';
                            opt.appendChild(icon);
                        }
                    }
                });
            }
        }

        function selectOption(index, type) {
            const options = document.querySelectorAll('.option');
            
            if (type === '多选题') {
                const option = document.querySelectorAll('.option')[index];
                option.classList.toggle('selected');
                const selectedOptions = Array.from(options).filter(function(opt) { 
                    return opt.classList.contains('selected'); 
                }).map(function(opt, i) {
                    return String.fromCharCode(65 + Array.from(options).indexOf(opt));
                });
                saveAnswer(questions[currentQuestionIndex].id, selectedOptions);
                
                // Update submit button text based on selection
                const submitBtn = document.getElementById('submit-btn');
                if (selectedOptions.length > 0) {
                    submitBtn.textContent = '确认答案 (' + selectedOptions.length + '项)';
                    submitBtn.style.opacity = '1';
                } else {
                    submitBtn.textContent = '确认答案';
                    submitBtn.style.opacity = '0.6';
                }
            } else {
                // Single-choice and true/false: select immediately and auto-submit
                options.forEach(function(opt) { opt.classList.remove('selected'); });
                const option = document.querySelectorAll('.option')[typeof index === 'number' ? index : (index ? 0 : 1)];
                option.classList.add('selected');
                const answer = typeof index === 'number' ? String.fromCharCode(65 + index) : (index ? '对' : '错');
                saveAnswer(questions[currentQuestionIndex].id, answer);
                
                // Auto-submit for single-choice and true/false questions
                setTimeout(function() {
                    submitAnswer();
                }, 150);
            }
        }

        function saveAnswer(questionId, answer) {
            userAnswers[questionId] = answer;
        }

        function submitAnswer() {
            const question = questions[currentQuestionIndex];
            const userAnswer = userAnswers[question.id];
            
            if (!userAnswer) {
                alert('请先作答！');
                return;
            }
            
            // Prevent duplicate submissions for the same question
            if (hasSubmittedCurrent) {
                // If already submitted, allow navigation to next question
                if (getAnswerHistory()[question.id] && !getAnswerHistory()[question.id].isCorrect) {
                    nextQuestion();
                }
                return;
            }
            hasSubmittedCurrent = true;
            
            totalAnswered++;
            
            let isCorrect = false;
            let scoreResult = null;
            
            if (question.type === '多选题') {
                isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(question.answer.sort());
            } else if (question.type === '判断题') {
                isCorrect = (userAnswer === '对') === question.answer;
            } else if (question.type === '填空题') {
                scoreResult = calculateFillScore(userAnswer, question.answer);
                isCorrect = scoreResult.score >= 70;
            } else if (question.type === '简答题') {
                scoreResult = calculateEssayScore(userAnswer, question.answer, question);
                isCorrect = scoreResult.score >= 60;
            } else {
                isCorrect = userAnswer === question.answer;
            }
            
            // 记录答题历史（做题留痕）
            recordAnswerHistory(question.id, userAnswer, isCorrect, scoreResult);
            
            if (isCorrect) {
                totalCorrect++;
                consecutiveCorrect++;
                if (consecutiveCorrect >= 3) {
                    showPraise();
                    consecutiveCorrect = 0;
                }
                
                showResult(isCorrect, question, scoreResult, userAnswer);
                updateStats();
                
                // 正确答题后延迟自动跳转（可配置时间）
                if (question.type !== '多选题') {
                    // 显示即将跳转提示
                    showAutoAdvanceNotice();
                    
                    autoAdvanceTimer = setTimeout(() => {
                        hideAutoAdvanceNotice();
                        nextQuestion();
                    }, AUTO_ADVANCE_DELAY);
                }
                
                return;
            } else {
                consecutiveCorrect = 0;
                showEncouragement();
                addToWrongBook(question, userAnswer);
            }
            
            showResult(isCorrect, question, scoreResult, userAnswer);
            updateStats();
            
            // 错误答题时显示手动操作提示
            showManualNavigationPrompt();
        }
        
        // 显示自动跳转提示
        function showAutoAdvanceNotice() {
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.textContent = '回答正确！' + (AUTO_ADVANCE_DELAY / 1000) + '秒后自动跳转...';
            submitBtn.style.opacity = '1';
        }
        
        // 隐藏自动跳转提示
        function hideAutoAdvanceNotice() {
            // 颜色保持原有样式不变
        }
        
        // 显示手动操作提示（错误答题时）
        function showManualNavigationPrompt() {
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.textContent = '查看解析后点击前往下一题 →';
            submitBtn.style.opacity = '1';
        }

        function showResult(isCorrect, question, scoreResult, userAnswer) {
            const options = document.querySelectorAll('.option');
            
            if (question.type === '单选题' || question.type === '多选题') {
                options.forEach(function(opt, index) {
                    opt.style.pointerEvents = 'none';
                    const optionLetter = String.fromCharCode(65 + index);
                    
                    if (question.type === '多选题') {
                        if (question.answer.includes(optionLetter)) {
                            opt.classList.add('correct');
                            opt.classList.remove('wrong', 'selected');
                            // Add checkmark icon for correct answers
                            if (!opt.querySelector('.result-icon')) {
                                const icon = document.createElement('span');
                                icon.className = 'result-icon';
                                icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                                icon.textContent = '✓';
                                opt.appendChild(icon);
                            }
                        } else if (opt.classList.contains('selected')) {
                            opt.classList.add('wrong');
                            // Add X icon for wrong selections
                            if (!opt.querySelector('.result-icon')) {
                                const icon = document.createElement('span');
                                icon.className = 'result-icon';
                                icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                                icon.textContent = '✗';
                                opt.appendChild(icon);
                            }
                        }
                    } else {
                        if (optionLetter === question.answer) {
                            opt.classList.add('correct');
                            // Add checkmark icon for correct answer
                            if (!opt.querySelector('.result-icon')) {
                                const icon = document.createElement('span');
                                icon.className = 'result-icon';
                                icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                                icon.textContent = '✓';
                                opt.appendChild(icon);
                            }
                        }
                        if (opt.classList.contains('selected') && optionLetter !== question.answer) {
                            opt.classList.add('wrong');
                            // Add X icon for wrong answer
                            if (!opt.querySelector('.result-icon')) {
                                const icon = document.createElement('span');
                                icon.className = 'result-icon';
                                icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                                icon.textContent = '✗';
                                opt.appendChild(icon);
                            }
                        }
                    }
                });
            } else if (question.type === '判断题') {
                options.forEach(function(opt, index) {
                    opt.style.pointerEvents = 'none';
                    const isTrue = index === 0;
                    if (isTrue === question.answer) {
                        opt.classList.add('correct');
                        // Add checkmark icon
                        if (!opt.querySelector('.result-icon')) {
                            const icon = document.createElement('span');
                            icon.className = 'result-icon';
                            icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                            icon.textContent = '✓';
                            opt.appendChild(icon);
                        }
                    }
                    if (opt.classList.contains('selected') && isTrue !== question.answer) {
                        opt.classList.add('wrong');
                        // Add X icon
                        if (!opt.querySelector('.result-icon')) {
                            const icon = document.createElement('span');
                            icon.className = 'result-icon';
                            icon.style.cssText = 'margin-left: auto; font-size: 20px; font-weight: bold;';
                            icon.textContent = '✗';
                            opt.appendChild(icon);
                        }
                    }
                });
            }
            
            // 显示正确/错误反馈
            if (isCorrect) {
                document.getElementById('correct-feedback').style.display = 'block';
                document.getElementById('correct-feedback-content').textContent = 
                    question.type === '简答题' || question.type === '填空题' ? 
                    '做得很好！继续保持！' : '回答正确！';
            } else {
                document.getElementById('error-feedback').style.display = 'block';
                document.getElementById('error-feedback-content').textContent = 
                    '这道题答错了，没关系，认真看解析学习！';
            }
            
            // 显示评分卡片（针对主观题）
            if ((question.type === '填空题' || question.type === '简答题') && scoreResult) {
                const scoreLevel = getScoreLevel(scoreResult.score);
                const levelInfo = scoringRules[scoreLevel];
                
                document.getElementById('score-card').style.display = 'block';
                document.getElementById('score-value').textContent = scoreResult.score;
                document.getElementById('score-value').style.color = levelInfo.color;
                
                const levelElement = document.getElementById('score-level');
                levelElement.textContent = levelInfo.label;
                levelElement.className = 'score-level ' + scoreLevel;
                
                let detailsText = '<p>' + levelInfo.feedback + '</p>';
                
                if (scoreResult.details && scoreResult.details.length > 0) {
                    detailsText += '<p>' + scoreResult.details.map(d => escapeHtml(d)).join('<br>') + '</p>';
                }
                
                document.getElementById('score-details').innerHTML = detailsText;
            }
            
            // 显示答案解析
            let standardAnswer = (question.type === '多选题') ? question.answer.join(', ') : question.answer;
            document.getElementById('analysis-text').textContent = '标准答案：' + standardAnswer + '\n\n' + question.analysis;
            document.getElementById('analysis').style.display = 'block';
            
            // 显示知识讲解
            document.getElementById('knowledge-section').style.display = 'block';
            document.getElementById('knowledge-content').innerHTML = getKnowledgeContent(question.category);
        }

        function addToWrongBook(question, userAnswer) {
            let wrongBook = [];
            try {
                wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
            } catch (e) {
                console.warn('读取错题本失败:', e);
            }
            const exists = wrongBook.find(function(w) { return w.id === question.id; });
            
            if (!exists) {
                wrongBook.push({
                    id: question.id,
                    type: question.type,
                    question: question.question,
                    options: question.options,
                    answer: question.answer,
                    userAnswer: userAnswer,
                    analysis: question.analysis,
                    category: question.category
                });
                try {
                localStorage.setItem('wrongBook', JSON.stringify(wrongBook));
            } catch (e) {
                console.warn('保存错题本失败:', e);
            }
            }
        }

        function updateStats() {
            let stats = {total: 0, correct: 0};
            try {
                stats = JSON.parse(localStorage.getItem('quizStats') || '{"total":0,"correct":0}');
            } catch (e) {
                console.warn('读取统计失败:', e);
            }
            stats.total++;
            const question = questions[currentQuestionIndex];
            let isCorrect = false;
            
            if (question.type === '多选题') {
                isCorrect = JSON.stringify((userAnswers[question.id] || []).sort()) === JSON.stringify(question.answer.sort());
            } else if (question.type === '判断题') {
                isCorrect = (userAnswers[question.id] === '对') === question.answer;
            } else if (question.type === '填空题') {
                isCorrect = (userAnswers[question.id] || '').trim().toLowerCase() === question.answer.trim().toLowerCase();
            } else if (question.type === '简答题') {
                scoreResult = calculateEssayScore(userAnswer, question.answer, question);
                isCorrect = scoreResult.score >= 60;
            } else {
                isCorrect = userAnswers[question.id] === question.answer;
            }
            
            if (isCorrect) stats.correct++;
            try {
                localStorage.setItem('quizStats', JSON.stringify(stats));
            } catch (e) {
                console.warn('保存统计失败:', e);
            }
        }

        function nextQuestion() {
            // 清除自动跳转计时器
            if (autoAdvanceTimer) {
                clearTimeout(autoAdvanceTimer);
                autoAdvanceTimer = null;
            }
            
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion();
            } else {
                finishQuiz();
            }
        }
        
        function prevQuestion() {
            // 清除自动跳转计时器
            if (autoAdvanceTimer) {
                clearTimeout(autoAdvanceTimer);
                autoAdvanceTimer = null;
            }
            
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion();
            }
        }

        function toggleMark() {
            const questionId = questions[currentQuestionIndex].id;
            const index = markedQuestions.indexOf(questionId);
            
            if (index > -1) {
                markedQuestions.splice(index, 1);
            } else {
                markedQuestions.push(questionId);
            }
            
            updateMarkButton();
        }

        function updateMarkButton() {
            const btn = document.getElementById('mark-btn');
            const questionId = questions[currentQuestionIndex].id;
            
            if (markedQuestions.includes(questionId)) {
                btn.classList.add('marked');
                btn.textContent = '📌 已标记';
            } else {
                btn.classList.remove('marked');
                btn.textContent = '📌 标记题目';
            }
        }

        function updateJumpPanel() {
            const panel = document.getElementById('jump-panel');
            panel.innerHTML = '';
            
            // 按题型分组
            const groups = {};
            questions.forEach(function(q, index) {
                if (!groups[q.type]) {
                    groups[q.type] = [];
                }
                groups[q.type].push({ question: q, index: index });
            });
            
            // 按顺序显示各题型
            const typeOrder = ['单选题', '多选题', '判断题', '填空题', '简答题'];
            typeOrder.forEach(function(type) {
                if (groups[type]) {
                    // 创建分组标题
                    const titleDiv = document.createElement('div');
                    titleDiv.className = 'jump-group-title';
                    titleDiv.textContent = type;
                    panel.appendChild(titleDiv);
                    
                    // 创建分组容器
                    const groupDiv = document.createElement('div');
                    groupDiv.className = 'jump-group';
                    
                    groups[type].forEach(function(item) {
                        const btn = document.createElement('button');
                        btn.className = 'jump-btn';
                        // 直接显示完整id
                        btn.textContent = item.question.id;
                        
                        if (item.index === currentQuestionIndex) btn.classList.add('current');
                        if (userAnswers[item.question.id]) btn.classList.add('answered');
                        if (markedQuestions.includes(item.question.id)) btn.classList.add('marked');
                        
                        btn.onclick = function() {
                            currentQuestionIndex = item.index;
                            showQuestion();
                        };
                        
                        groupDiv.appendChild(btn);
                    });
                    
                    panel.appendChild(groupDiv);
                }
            });
        }

        function finishQuiz() {
            clearInterval(timerInterval);
            
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            const timeStr = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
            
            const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
            
            document.getElementById('result-score').textContent = accuracy + '分';
            document.getElementById('result-label').textContent = getScoreLabel(accuracy);
            document.getElementById('stat-answered').textContent = totalAnswered;
            document.getElementById('stat-correct').textContent = totalCorrect;
            document.getElementById('stat-accuracy').textContent = accuracy + '%';
            document.getElementById('stat-time').textContent = timeStr;
            
            // 收集错题数据
            const wrongQuestions = [];
            questions.forEach(function(q) {
                const userAnswer = userAnswers[q.id];
                let isWrong = false;
                
                if (q.type === '多选题') {
                    isWrong = JSON.stringify((userAnswer || []).sort()) !== JSON.stringify(q.answer.sort());
                } else if (q.type === '判断题') {
                    isWrong = (userAnswer === '对') !== q.answer;
                } else if (q.type === '填空题') {
                    isWrong = (userAnswer || '').trim().toLowerCase() !== q.answer.trim().toLowerCase();
                } else if (q.type === '简答题') {
                    const scoreResult = calculateEssayScore(userAnswer, q.answer, q);
                    isWrong = scoreResult.score < 60;
                } else {
                    isWrong = userAnswer !== q.answer;
                }
                
                if (isWrong) {
                    wrongQuestions.push({
                        id: q.id,
                        type: q.type,
                        question: q.question,
                        category: q.category,
                        userAnswer: userAnswer,
                        correctAnswer: q.answer
                    });
                }
            });
            
            // 保存答题记录
            saveQuizResult(totalCorrect, totalAnswered, wrongQuestions);
            
            showWeaknessAnalysis();
            showErrorList();
            
            document.getElementById('quiz-page').style.display = 'none';
            document.getElementById('result-page').style.display = 'block';
        }

        

        function getScoreLabel(score) {
            if (score >= 90) return '🏆 优秀！继续保持！';
            if (score >= 80) return '👍 良好！再接再厉！';
            if (score >= 60) return '💪 及格！还需努力！';
            return '📚 需要多加练习！';
        }

        function showWeaknessAnalysis() {
            const weaknessList = document.getElementById('weakness-list');
            weaknessList.innerHTML = '';
            
            const categoryStats = {};
            questions.forEach(function(q) {
                if (!categoryStats[q.category]) {
                    categoryStats[q.category] = { total: 0, wrong: 0 };
                }
                categoryStats[q.category].total++;
                
                const userAnswer = userAnswers[q.id];
                let isWrong = false;
                
                if (q.type === '多选题') {
                    isWrong = JSON.stringify((userAnswer || []).sort()) !== JSON.stringify(q.answer.sort());
                } else if (q.type === '判断题') {
                    isWrong = (userAnswer === '对') !== q.answer;
                } else if (q.type === '填空题') {
                    isWrong = (userAnswer || '').trim().toLowerCase() !== q.answer.trim().toLowerCase();
                } else if (q.type !== '简答题') {
                    isWrong = userAnswer !== q.answer;
                }
                
                if (isWrong) categoryStats[q.category].wrong++;
            });
            
            const weaknesses = Object.entries(categoryStats)
                .filter(function(entry) { return entry[1].wrong > 0; })
                .sort(function(a, b) { return b[1].wrong - a[1].wrong; })
                .slice(0, 5);
            
            if (weaknesses.length === 0) {
                weaknessList.innerHTML = '<span class="weakness-tag">🎉 暂无薄弱知识点！</span>';
            } else {
                weaknesses.forEach(function(entry) {
                    const category = entry[0];
                    const stats = entry[1];
                    const tag = document.createElement('span');
                    tag.className = 'weakness-tag';
                    tag.textContent = category + ' (错误' + stats.wrong + '次)';
                    weaknessList.appendChild(tag);
                });
            }
        }

        function showErrorList() {
            const errorList = document.getElementById('result-errors');
            errorList.innerHTML = '';
            
            questions.forEach(function(q) {
                const userAnswer = userAnswers[q.id];
                let isWrong = false;
                
                if (!userAnswer) return;
                
                if (q.type === '多选题') {
                    isWrong = JSON.stringify((userAnswer || []).sort()) !== JSON.stringify(q.answer.sort());
                } else if (q.type === '判断题') {
                    isWrong = (userAnswer === '对') !== q.answer;
                } else if (q.type === '填空题') {
                    isWrong = (userAnswer || '').trim().toLowerCase() !== q.answer.trim().toLowerCase();
                } else if (q.type !== '简答题') {
                    isWrong = userAnswer !== q.answer;
                }
                
                if (isWrong) {
                    let cleanQuestion = q.question;
                    cleanQuestion = cleanQuestion.replace(/^(单选题|多选题|判断题|填空题|简答题)\d+、/, '');
                    const item = document.createElement('div');
                    item.className = 'error-item';
                    item.innerHTML = '<div class="error-question">' + escapeHtml(cleanQuestion) + '</div><div class="error-category">' + escapeHtml(q.category) + '</div>';
                    item.onclick = function() {
                        currentQuestionIndex = questions.indexOf(q);
                        document.getElementById('result-page').style.display = 'none';
                        document.getElementById('quiz-page').style.display = 'block';
                        showQuestion();
                        submitAnswer();
                    };
                    errorList.appendChild(item);
                }
            });
        }

        function showResultTab(tab, clickedElement) {
            document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
            if (clickedElement) clickedElement.classList.add('active');
            
            if (tab === 'overview') {
                document.getElementById('result-overview').style.display = 'block';
                document.getElementById('result-errors').style.display = 'none';
            } else {
                document.getElementById('result-overview').style.display = 'none';
                document.getElementById('result-errors').style.display = 'block';
            }
        }

        function showWrongBook() {
            let wrongBook = [];
            try {
                wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
            } catch (e) {
                console.warn('读取错题本失败:', e);
            }
            const content = document.getElementById('wrongbook-content');
            
            if (wrongBook.length === 0) {
                content.innerHTML = '<div class="empty-state"><div class="empty-icon">🎉</div><p>太棒了！暂无错题！</p></div>';
            } else {
                let html = '';
                html += '<div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">';
                html += '<p style="color: #666;">共 ' + wrongBook.length + ' 道错题</p>';
                html += '<button class="btn btn-secondary" onclick="clearWrongBook()">🗑️ 清空错题</button>';
                html += '</div>';
                html += '<div class="error-list">';
                wrongBook.map(function(w, index) {
                    let cleanQuestion = w.question;
                    cleanQuestion = cleanQuestion.replace(/^(单选题|多选题|判断题|填空题|简答题)\d+、/, '');
                    html += '<div class="error-item" onclick="reviewWrong(' + index + ')">';
                    html += '<div class="error-question"><strong>' + escapeHtml(w.type) + '</strong> ' + escapeHtml(cleanQuestion) + '</div>';
                    html += '<div class="error-category">' + w.category + '</div>';
                    html += '</div>';
                });
                html += '</div>';
                content.innerHTML = html;
            }
            
            document.getElementById('home-page').style.display = 'none';
            document.getElementById('quiz-page').style.display = 'none';
            document.getElementById('result-page').style.display = 'none';
            document.getElementById('wrongbook-page').style.display = 'block';
            document.getElementById('stats-page').style.display = 'none';
        }

        function reviewWrong(index) {
            let wrongBook = [];
            try {
                wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
            } catch (e) {
                console.warn('读取错题本失败:', e);
            }
            const wrong = wrongBook[index];
            
            currentQuestionIndex = questions.findIndex(function(q) { return q.id === wrong.id; });
            if (currentQuestionIndex === -1) {
                alert('题目不存在');
                return;
            }
            
            document.getElementById('wrongbook-page').style.display = 'none';
            document.getElementById('quiz-page').style.display = 'block';
            showQuestion();
        }

        function clearWrongBook() {
            if (confirm('确定要清空所有错题吗？')) {
                try {
                localStorage.removeItem('wrongBook');
            } catch (e) {
                console.warn('清空错题本失败:', e);
            }
                showWrongBook();
            }
        }

        function showStats() {
            let stats = {total: 0, correct: 0};
            try {
                stats = JSON.parse(localStorage.getItem('quizStats') || '{"total":0,"correct":0}');
            } catch (e) {
                console.warn('读取统计失败:', e);
            }
            let wrongBook = [];
            try {
                wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
            } catch (e) {
                console.warn('读取错题本失败:', e);
            }
            const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            
            document.getElementById('stats-total').textContent = stats.total;
            document.getElementById('stats-correct').textContent = stats.correct;
            document.getElementById('stats-accuracy').textContent = accuracy + '%';
            document.getElementById('stats-wrong').textContent = wrongBook.length;
            
            document.getElementById('home-page').style.display = 'none';
            document.getElementById('quiz-page').style.display = 'none';
            document.getElementById('result-page').style.display = 'none';
            document.getElementById('wrongbook-page').style.display = 'none';
            document.getElementById('stats-page').style.display = 'block';
        }

        function goHome() {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            
            // 清除自动跳转计时器
            if (autoAdvanceTimer) {
                clearTimeout(autoAdvanceTimer);
                autoAdvanceTimer = null;
            }
            
            document.getElementById('home-page').style.display = 'block';
            document.getElementById('quiz-page').style.display = 'none';
            document.getElementById('result-page').style.display = 'none';
            document.getElementById('wrongbook-page').style.display = 'none';
            document.getElementById('stats-page').style.display = 'none';
            document.getElementById('data-collection-page').style.display = 'none';
        }

        // 数据收集相关函数
        function showDataCollection() {
            // 读取本地数据
            let quizRecords = [];
            try {
                quizRecords = JSON.parse(localStorage.getItem('quizRecords') || '[]');
            } catch (e) {
                console.warn('读取答题记录失败:', e);
            }
            
            let wrongBook = [];
            try {
                wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
            } catch (e) {
                console.warn('读取错题本失败:', e);
            }
            
            // 计算统计数据
            const totalRecords = quizRecords.length;
            let totalQuestions = 0;
            let totalCorrect = 0;
            const categoryErrors = {};
            
            quizRecords.forEach(record => {
                totalQuestions += record.totalQuestions || 0;
                totalCorrect += record.correctCount || 0;
                
                // 统计错题知识点
                if (record.wrongQuestions) {
                    record.wrongQuestions.forEach(q => {
                        const cat = q.category || '未分类';
                        categoryErrors[cat] = (categoryErrors[cat] || 0) + 1;
                    });
                }
            });
            
            // 计算平均正确率
            const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
            
            // 更新显示
            document.getElementById('my-total').textContent = totalRecords;
            document.getElementById('my-avg-accuracy').textContent = avgAccuracy + '%';
            
            // 显示薄弱知识点
            const weaknessDiv = document.getElementById('my-weakness');
            if (Object.keys(categoryErrors).length > 0) {
                let weaknessHtml = '<div style="display:flex;flex-wrap:wrap;gap:8px;">';
                const sortedCategories = Object.entries(categoryErrors).sort((a, b) => b[1] - a[1]);
                sortedCategories.forEach(([cat, count]) => {
                    weaknessHtml += `<span class="knowledge-tag">${cat} (${count}次)</span>`;
                });
                weaknessHtml += '</div>';
                weaknessDiv.innerHTML = weaknessHtml;
            } else {
                weaknessDiv.innerHTML = '<p>暂无错题记录</p>';
            }
            
            // 切换页面
            document.getElementById('home-page').style.display = 'none';
            document.getElementById('quiz-page').style.display = 'none';
            document.getElementById('result-page').style.display = 'none';
            document.getElementById('wrongbook-page').style.display = 'none';
            document.getElementById('stats-page').style.display = 'none';
            document.getElementById('data-collection-page').style.display = 'block';
        }

        function submitFeedback() {
            const name = document.getElementById('feedback-name').value.trim();
            const content = document.getElementById('feedback-content').value.trim();
            
            if (!content) {
                alert('请填写反馈内容！');
                return;
            }
            
            const feedback = {
                id: Date.now(),
                name: name || '匿名用户',
                content: content,
                timestamp: new Date().toISOString()
            };
            
            // 保存到本地
            let feedbacks = [];
            try {
                feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
            } catch (e) {
                console.warn('读取反馈失败:', e);
            }
            
            feedbacks.push(feedback);
            
            try {
                localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
            } catch (e) {
                console.warn('保存反馈失败:', e);
            }
            
            alert('感谢您的反馈！🎉');
            document.getElementById('feedback-name').value = '';
            document.getElementById('feedback-content').value = '';
        }

        function exportAllData() {
            // 收集所有数据
            const data = {
                exportTime: new Date().toISOString(),
                quizRecords: [],
                wrongBook: [],
                feedbacks: []
            };
            
            try {
                data.quizRecords = JSON.parse(localStorage.getItem('quizRecords') || '[]');
            } catch (e) {
                console.warn('读取答题记录失败:', e);
            }
            
            try {
                data.wrongBook = JSON.parse(localStorage.getItem('wrongBook') || '[]');
            } catch (e) {
                console.warn('读取错题本失败:', e);
            }
            
            try {
                data.feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
            } catch (e) {
                console.warn('读取反馈失败:', e);
            }
            
            // 生成文件名
            const fileName = '题库数据_' + new Date().toLocaleDateString('zh-CN').replace(/\//g, '-') + '.json';
            
            // 导出为JSON文件
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            alert('数据导出成功！文件已下载。\n请将此文件发送给老师汇总。');
        }

        function viewLocalData() {
            const data = {
                quizRecords: JSON.parse(localStorage.getItem('quizRecords') || '[]'),
                wrongBook: JSON.parse(localStorage.getItem('wrongBook') || '[]'),
                feedbacks: JSON.parse(localStorage.getItem('feedbacks') || '[]')
            };
            
            const preview = '📊 本地数据预览：\n\n' +
                '答题次数：' + data.quizRecords.length + '\n' +
                '错题数量：' + data.wrongBook.length + '\n' +
                '反馈数量：' + data.feedbacks.length + '\n\n' +
                '如需查看详细数据，请点击"导出全部数据"按钮。';
            
            alert(preview);
        }

        // 修改结果页面，保存答题记录
        function saveQuizResult(correctCount, totalQuestions, wrongQuestions) {
            const record = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                totalQuestions: totalQuestions,
                correctCount: correctCount,
                accuracy: Math.round((correctCount / totalQuestions) * 100),
                wrongQuestions: wrongQuestions
            };
            
            let quizRecords = [];
            try {
                quizRecords = JSON.parse(localStorage.getItem('quizRecords') || '[]');
            } catch (e) {
                console.warn('读取答题记录失败:', e);
            }
            
            quizRecords.push(record);
            
            try {
                localStorage.setItem('quizRecords', JSON.stringify(quizRecords));
            } catch (e) {
                console.warn('保存答题记录失败:', e);
            }
        }

        function confirmExit() {
            if (confirm('确定要退出答题吗？当前答题进度将不会保存。')) {
                goHome();
            }
        }

        // 页面卸载时清理资源
        window.addEventListener('beforeunload', function() {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            if ('speechSynthesis' in window && typeof speechSynthesis !== 'undefined') {
                try {
                    speechSynthesis.cancel();
                } catch (e) {}
            }
        });
        
        function agreeAndStart() {
            document.getElementById('consent-overlay').style.display = 'none';
            document.getElementById('consent-modal').style.display = 'none';
        }

        // ========== 初始化 ==========
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('consent-overlay').style.display = 'block';
            document.getElementById('consent-modal').style.display = 'block';
        });
