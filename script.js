//Look here for help setting up Cognito: https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html
console.log("Starting to execute the script file...");

if(!$){
	console.log("jQuery is NOT loaded properly");
}else{
	console.log("jQuery is good to use");
}

if(!window.AWS){
	console.log("Amazon Basic SDK is NOT loaded properly");
}else{
	console.log("Amazon Basic SDK is good to use");
}

if(!!window.AWSCognito && !!window.AmazonCognitoIdentity){
	console.log("Amazon Cognito SDK is good to use");
}else{
	console.log("Amazon Cognito SDK is NOT loaded properly");
}

// Config for Amazon Cognito service specifically.
AWSCognito.config.region = 'us-east-2';

var poolData = {
    UserPoolId : 'us-east-2_cQ01gzmeO', // your user pool id here pro240pool
    ClientId : '5gjooturail1hh1aemr49g3qm0' // your app client id here pro240client
};

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var cognitoUser;


function changePage(pageName) {
    
    if (window.location!=pageName) {
    window.location = pageName;
    }
    
}

function createAccount(){
	console.log("executing createAccount()...");
	
	console.log($(".createAccountDiv"));
	
	var dataObj = {
		usern: document.getElementById("formUN").value,
        email: document.getElementById("formEM").value,
		passw: document.getElementById("formPW").value
	};
	
	console.log("Retrieved this username from the form: "+dataObj.usern);
	console.log("Retrieved this password from the form: "+dataObj.passw);
    
    var attributeList = [];
    
    var dataEmail = {
        Name : 'email',
        Value : dataObj.email
        
    };
    
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
    
	userPool.signUp(dataObj.usern, dataObj.passw, attributeList, null, onSignUpResult);
	
    console.log('End of createAccount function');
};

function logout(){
	console.log("executing logout()...");
    if (cognitoUser =! null) {
        cognitoUser.signOut;
    }
	showNotLoggedInView();
    
    console.log('End of logout function');
};

function changePage(pageName){
    
    if (pageName != window.location) {
        window.location = pageName;
    }
}

function showNotLoggedInView(){
	console.log("executing showNotLoggedInView()...");
	$(".createAccountDiv").show();
	$(".logoutDiv").hide();
    console.log('End of showNotLoggedInView function');
}

function showLoggedInView(){
	console.log("executing showLoggedInView()...");
	$(".createAccountDiv").hide();
    $("#usernameDiv").html("Welcome, " + cognitoUser.getUsername());
    
	$(".logoutDiv").show();
    console.log('End of showLoggedInView function');
}

function onSignUpResult(err, result){
	if (err) {
		console.log('Sign up failure: '+err);
		alert(err);
		return;
	}
	console.log('Sign up success: '+JSON.stringify(result));
	cognitoUser = result.user;
	console.log('user name is ' + cognitoUser.getUsername);
    
	showLoggedInView();
}

// Config for a service user who has roles to access Lambda, S3 and other services included in Amazon's basic SDK.
var accessKeyId = 'putyouraccessidhere';
var secretAccessKey = 'putyoursecretaccesskeyhere';

AWS.config.update({
	region: 'us-east-2',
	credentials: new AWS.Credentials(accessKeyId, secretAccessKey)
});
/// Prepare to call Lambda function
lambda = new AWS.Lambda({region: 'us-east-2', apiVersion: '2015-03-31'});
var params = {
	FunctionName : 'arn:putyourlambdaarnhere',
	InvocationType : 'RequestResponse',
	LogType : 'None'
};

function callLambdaFunctionOnAws() {
	lambda.invoke(params, function(err, data) {
		if (err) {
			prompt(err);
		} else {
			pullResults = JSON.parse(data.Payload);
			var t = document.createTextNode(pullResults);
			document.body.appendChild(t);
		}
	});
};

function performLogin(){
	var usernameToLogin = document.getElementById("loginUsername").value;
	var passwordToLogin = document.getElementById("loginPassword").value;
	
	console.log("Retrieved this username from the login form: "+usernameToLogin);
	console.log("Retrieved this password from the login form: "+passwordToLogin);
	
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails({
		Username : usernameToLogin,
        Password : passwordToLogin
	});
    var userData = {
        Username : usernameToLogin,
        Pool : userPool
    };
    var cognitoUserToLogin = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUserToLogin.authenticateUser(authenticationDetails, {
        onSuccess: onSuccessfulLogin,
 
        onFailure: function(err) {
            alert(err);
        },
		
		newPasswordRequired: function(obj){
			alert("new password required: "+JSON.stringify(obj));
		},
 
    });
    
}

function onSuccessfulLogin(result) {
	console.log("You are successfully logged in.");
    showLoggedInView();
	//console.log('access token + ' + result.getAccessToken().getJwtToken());
    /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
    //console.log('idToken + ' + result.idToken.jwtToken);
}

function initiateApp(){
    cognitoUser = userPool.getCurrentUser();
    if (cognitoUser == null) {
            console.log("No session found in browser storage");
            showNotLoggedInView();
    }else{
        console.log("A user session was found in browser storage: "+JSON.stringify(cognitoUser));

        cognitoUser.getSession(function(err, session) {
            if (err) {
                console.log("Even though user sesssion was found in browser storage, the session is invalid.");
                howNotLoggedInView();
                return;
            }
            showLoggedInView();
        });
    }
}

initiateApp();
