
const userDropdown = document.getElementById("userDropdown");
const userMenu = document.getElementById("userMenu");
const userDropdownMenu = document.getElementById("userDropdownMenu");
const loginButton = document.getElementById("loginButton");


// 检查用户是否已登录
const checkToken = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/v2/check", true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) { // 请求完成
      if (xhr.status === 200) { // 登录成功
        // 从响应头获取 CSRF Token 和 Session ID
        const csrfToken = xhr.getResponseHeader("x-csrf-token");
        const sessionId = xhr.getResponseHeader("s-id");
        const response = JSON.parse(xhr.responseText); // 假设服务器返回用户信息

        // 存储 Token 和用户信息
        if (csrfToken) {
          localStorage.setItem("X-CSRF-TOKEN", csrfToken);
        }
        if (sessionId) {
          localStorage.setItem("s-id", sessionId);
        }
        if (response.success && response.msg === 'login') {
          localStorage.setItem("userInfo", JSON.stringify(response.data));

          // 从 localStorage 获取用户信息
          const storedUserInfo = localStorage.getItem("userInfo");
          const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

          
          // 动态更新用户菜单
          if (userInfo) {
            userMenu.textContent = userInfo.nickname || "用户中心";  // 显示用户名或“用户中心”

            // 显示用户下拉菜单并隐藏登录按钮
            userDropdown.style.display = "block";
            loginButton.style.display = "none";

             
            // 退出登录功能
            document.getElementById("logout").addEventListener("click", function () {

              // 发送 GET 请求到 /sign-out
              fetch('/api/v2/sign-out', {
                method: 'GET',
                headers: {
                  'X-CSRF-TOKEN': localStorage.getItem('X-CSRF-TOKEN'), // 传递 CSRF Token（如果需要）
                  's-id': localStorage.getItem('s-id'), // 传递 CSRF Token（如果需要）
                },
              })
                .then(response => {
                  if (response.ok) {
                    // 成功注销后清除本地存储的用户信息
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("X-CSRF-TOKEN");
                    localStorage.removeItem("s-id");

                    // 刷新页面
                    window.location.reload();
                  } else {
                    // 处理错误情况
                    console.error("注销失败", response.statusText);
                  }
                })
                .catch(error => {
                  console.error("请求错误", error);
                });
            });
            
            console.log("login")
          } else {
            userDropdown.style.display = "none";
            loginButton.style.display = "block";
          }
        }else{
          userDropdown.style.display = "none";
            loginButton.style.display = "block";
          // 未登录或登录失效，清除本地存储
          localStorage.removeItem("userInfo");
        }

      } else {
        
        userDropdown.style.display = "none";
            loginButton.style.display = "block";
        // 未登录或登录失效，清除本地存储
        localStorage.removeItem("userInfo");
      }
    }
  };

  xhr.send();
};
checkToken(); 