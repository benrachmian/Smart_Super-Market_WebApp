<%@ page import="sdm.utils.SessionUtils" %>
<%@ page import="sdm.constants.Constants" %><%--
  Created by IntelliJ IDEA.
  User: benra
  Date: 04/10/2020
  Time: 11:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login to system</title>
    <link rel="stylesheet" href="../../common/bootstrap.min.css">
    <link rel="stylesheet" href="../../common/css/signup.css">

    <script src="../../common/jquery-2.0.3.min.js"></script>
    <script src="../../common/popper.min.js"></script>
    <script src="../../common/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
        <% String usernameFromSession = SessionUtils.getUsername(request);%>
        <% String usernameFromParameter = request.getParameter(Constants.USERNAME) != null ? request.getParameter(Constants.USERNAME) : "";%>
        <% String roleFromParameter = request.getParameter(Constants.ROLE) != null ? request.getParameter(Constants.ROLE) : "";%>
        <% if (usernameFromSession == null) {%>
    <h2>Please enter a unique user name:</h2>
    <form id="login" method="GET" action="login">
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" class="form-control" id="username" placeholder="Enter username" name="username" value="<%=usernameFromParameter%>">
        </div>
        <p>Please select your role:</p>
        <input type="radio" id="customer" name="role" value="customer">
        <label for="customer">Customer</label><br>
        <input type="radio" id="store-owner" name="role" value="store-owner">
        <label for="store-owner">Store Owner</label><br>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
            <div class="isa_error">
                <i class="fa fa-times-circle"></i>
                <% Object errorMessage = request.getAttribute(Constants.ERROR);%>
                <% if (errorMessage != null) {%>
            <span id="error"><%=errorMessage%></span>
                <% } %>
            </div>
                <% } %>



</body>
</html>
