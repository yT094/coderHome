# coderHome

## 项目简介
- coderHome 旨在打造一个程序员畅所欲言的平台。

## 提供的功能

### 功能一：用户注册登录

- **用户注册接口（`create`）**：
  - 验证用户（`verifyUser`）：新用户注册时，用户、密码为空或者不上送，不予通过；已经注册过的用户名，不能再注册。
  - 处理密码（`handlePassword`）；对合法的密码采用 `md5` 加密。
  - 用户注册（`create`）；将用户名和加密后的密码存入数据库中。

- **用户登录认证接口（`login`）**：
  - 验证登录（`verifyLogin`）：用户登录时，会对上送的 `name` 和  `password` 参数进行校验：用户名和密码为空、用户名在数据库中不存在、密码加密后与数据库中的密码不一致，均不予登录。
  - 颁发 `token` 令牌（`login`）：在验证用户名和密码正确的情况下，采用 `jwt-token` 机制，给用户颁发一个令牌，作为后续用户访问一些接口或者资源的凭证。后端通过这个凭证来判断用户是否有权限访问。
  - **注意**：颁发 `token` 时，使用 `PRIVATE_KEY`。
- **用户登录授权（`test`）**：
  - 验证授权（`verifyAuth`）：用户登录后，获取上送的 `token` 值，并验证 `token` 值，验证未通过，则抛出 `UNAUTHORIZATION` 的错误。
  - **注意**：
      - `token`  未上传，或者  `token`  验证未通过，均需抛出异常。
      - 验证授权时，使用 `PUBLIC_KEY`。

### 功能二：发表动态功能

- **发表动态（`/moment`）**：
  - 说明：用户登录以后，可以发表动态。
  - `middleware` 层：验证登录授权 `verifyAuth()`，只有登录的用户才能发动态，游客不能发动态。
  - `controller` 层：在 `create()` 函数内，获取 `userId` 和 `content`，并传给 `server` 层。
  - `server` 层：将 `user_id, content` 写入 `moment` 表中。
  - **注意**：获取用户 `id` 时，使用 `const { id } = ctx.response.user;`
- **修改动态（`/moment/:momentId`）**：
  - 说明：用户可以修改自己发表的动态。
  - `middleware` 层：验证登录 `verifyAuth()`，验证授权 `verifyPermission()`，修改动态时，只有登录的用户且自己发的动态，才能被修改。
  - `controller` 层：在 `update()` 函数内，获取 `userId` 和 `content`，并传给 `server` 层。
  - `server` 层：将 `userId, content` 写入 `moment` 表中。
- **获取动态（单个）（`/:momentId`）**：
  - 说明：用户可以获取单条动态详情。包括用户信息、头像、标签、评论内容、动态配图等。
  - `middleware` 层：游客也可以看到单条动态的内容，无需登录认证和授权。
  - `controller` 层：在 `detail()` 函数内，获取 `momentId`，并传给 `server` 层。
  - `server` 层：将 `momentId` 传入 `getMomentById()` 中，在 `moment` 表中，查询单条动态的信息并返回。
- **获取动态（列表）（`/moment`）**：
  - 说明：用户可分页获取 `moment` 表中的动态。包括动态内容、用户信息、评论总数和标签总数等。
  - `middleware` 层：游客也可以分页获取动态的内容，无需登录认证和授权。
  - `controller` 层：在 `list()` 函数内，获取 `offset, size`，并传给 `server` 层。
  - `server` 层：将 `offset, size` 传入 `getMomentList()` 中，在 `moment` 表中，查询动态的信息并返回。
  - **注意**：`offset, size` 参数客户端采用 `query` 的方式上送。

### 功能三：发表评论功能

- **发表评论（`/comment`）**：
  - 说明：用户登录以后，可以对某条动态发表评论。
  - `middleware` 层：验证登录授权 `verifyAuth()`，只有登录的用户对某条动态进行评论，游客不能发评论。
  - `controller` 层：在 `create()` 函数内，获取 `userId`,`momentId`和 `content`，并传给 `server` 层。
  - `server` 层：将 `userId, momentId, content` 写入 `comment` 表中。
  - **注意**：获取用户 `id` 时，使用 `const { id } = ctx.response.user;`
- **回复评论（`/:commentId/reply`）**：
  - 说明：用户可以回复某条评论。
  - `middleware` 层：验证登录 `verifyAuth()`，回复评论时，只有登录的用户才能回复某条评论。
  - `controller` 层：在 `reply()` 函数内，获取 `userId`,`commentId`, `momentId` 和 `content`，并传给 `server` 层。
  - `server` 层：将 `userId, commentId, momentId, content` 写入 `comment` 表中。
- **修改评论（`/:commentId`）**：
  - 说明：用户可以修改自己发表的动态。
  - `middleware` 层：验证登录 `verifyAuth()`，验证授权 `verifyPermission()`，修改评论时，只有登录的用户且自己发的评论，才能被修改。
  - `controller` 层：在 `update()` 函数内，获取 `commentId` 和 `content`，并传给 `server` 层。
  - `server` 层：将 `commentId, content` 写入 `comment` 表中。
- **删除评论（`/comment/:commentId`）**：
  - 说明：用户可以删除自己发表的评论。
  - `middleware` 层：验证登录 `verifyAuth()`，验证授权 `verifyPermission()`，删除评论时，只有登录的用户且自己发的评论，才能被删除。
  - `controller` 层：在 `remove()` 函数内，获取 `commentId`，并传给 `server` 层。
  - `server` 层：根据 `commentId`，将评论从 `comment` 表中移除。
- **获取评论（列表）（`/comment`）**：
  - 说明：用户可以获取某条动态的所有评论。
  - `middleware` 层：游客也可以获取某条动态的所有评论，无需登录认证和授权。
  - `controller` 层：在 `list()` 函数内，获取 `momentId`，并传给 `server` 层。
  - `server` 层：将 `momentId` 传入 `getCommentsByMomentId()` 中，在 `comment` 表中，查询评论信息并返回。
  - **注意**：`momentId` 参数客户端采用 `query` 的方式上送。

### 功能四：添加标签功能

- **创建标签（`/label`）**：
  - 说明：用户登录以后，可以创建标签。
  - `middleware` 层：验证登录授权 `verifyAuth()`，只有登录的用户才能创建标签，游客不能创建标签。
  - `controller` 层：在 `create()` 函数内，获取 `labelName`，并传给 `server` 层。
  - `server` 层：将 `labelName` 写入 `label` 表中。  
- **获取标签（列表）（`/moment`）**：
  - 说明：用户发布动态时，提供已有的标签列表供用户选择。
  - `middleware` 层：游客也可以分页获取动态的内容，无需登录认证和授权。
  - `controller` 层：在 `list()` 函数内，获取 `offset, size`，并传给 `server` 层。
  - `server` 层：将 `offset, size` 传入 `getLabels()` 中，在 `label` 表中，查询标签信息并返回。
  - **注意**：`offset, size` 参数客户端采用 `query` 的方式上送。

## 认证与授权的对比

| 认证                                          | 授权                            |
| ------------------------------------------- | ----------------------------- |
| 验证确认身份以授予对系统的访问权限。                          | 授权确定你是否有权访问资源。                |
| 这是验证用户凭据以获得用户访问权限的过程。                       | 这是验证是否允许访问的过程。                |
| 它决定用户是否是他声称的用户。                             | 它确定用户可以访问和不访问的内容。             |
| 身份验证通常需要用户名和密码。                             | 授权所需的身份验证因素可能有所不同，具体取决于安全级别。  |
| 身份验证是授权的第一步，因此始终是第一步。                       | 授权在成功验证后完成。                   |
| 例如，特定大学的学生在访问大学官方网站的学生链接之前需要进行身份验证。这称为身份验证。 | 例如，授权确定成功验证后学生有权在大学网站上访问哪些信息。


