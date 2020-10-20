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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login/Sign Up</title>


    <script src="../../common/jquery-2.0.3.min.js"></script>
    <script src="../../common/context-path-helper.js"></script>
    <script src="../../common/anime.min.js"></script>
    <script src="../../common/all-pages.js"></script>

    <link rel="stylesheet" href="../../common/bootstrap.min.css">
    <link rel="stylesheet" href="../../common/w3.css">
    <link rel="stylesheet" href="../../common/css/allPages.css">

</head>
<body>
<div class="w3-sidebar w3-bar-block w3-card w3-animate-left" style="display:none" id="mySidebar">
    <button class="w3-bar-item w3-button w3-large"
            onclick="w3_close()">Close &times;</button>
    <a href="../../index.html" class="w3-bar-item w3-button" onclick="w3_close()">Home</a>
    <a href="../../pages/signup/signup.html" class="w3-bar-item w3-button">Login/Sign up</a>
</div>

<div id="main">

    <div class="w3-teal">
        <button id="openNav" class="w3-button w3-teal w3-xlarge" onclick="w3_open()">&#9776;</button>
        <div class="w3-container" id="SDMTitle">
            <h1 class="ml5">
  <span class="text-wrapper">
    <span class="line line1"></span>
    <span class="letters letters-left">Super</span>
    <span class="letters ampersand">Duper</span>
    <span class="letters letters-right">Market</span>
    <span class="line line2"></span>
  </span>
            </h1>
        </div>
        <div class="w3-container" id="welcomeTitle">
            <h1>Login or sign up </h1>
        </div>
    </div>


    <div class="w3-container " id="centerPage">
        <% String usernameFromSession = SessionUtils.getUsername(request);%>
        <% String usernameFromParameter = request.getParameter(Constants.USERNAME) != null ? request.getParameter(Constants.USERNAME) : "";%>
        <% String roleFromParameter = request.getParameter(Constants.ROLE) != null ? request.getParameter(Constants.ROLE) : "";%>
        <% if (usernameFromSession == null) {%>
        <h4 id="sub-title2">Please enter a unique user name:</h4>
        <form id="login" method="GET" action="login">
            <div class="form-group">
                <input type="text" class="form-control" id="username" placeholder="Enter username" name="username" value="<%=usernameFromParameter%>">
            </div>
            <h4 id="sub-title2">Please select your role:</h4>
            <input type="radio" id="customer" name="role" value="customer">
            <label for="customer">Customer</label><br>
            <input type="radio" id="store-owner" name="role" value="store-owner">
            <label for="store-owner">Store Owner</label><br>
            <div class="centerDiv">
                <button type="submit" class="button ">Submit</button>
            </div>
        </form>
        <div class="isa_error">
            <i class="fa fa-times-circle"></i>
            <% Object errorMessage = request.getAttribute(Constants.ERROR);%>
            <% if (errorMessage != null) {%>
            <span id="error"><%=errorMessage%></span>
            <% } %>
        </div>
        <% } %>
    </div>
</div>
</body>
</html>