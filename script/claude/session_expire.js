if ($request.url.indexOf("claude.ai/api/account") != -1) {
    let modifiedHeaders = { ...$response.headers };
    modifiedHeaders["Set-Cookie"] = "sessionKey=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Domain=.claude.ai, routingHint=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Domain=.claude.ai";
    let mockBody = JSON.stringify({ "error": { "type": "authentication_error", "message": "session_expired" } });
    $notification.post("Claude 修复", "已强制触发登出", "请强退并重启 Claude App");
    $done({ status: 401, headers: modifiedHeaders, body: mockBody });
} else {
    $notification.post("Claude 修复", "未命中", "未命中");
    $done({});
}
