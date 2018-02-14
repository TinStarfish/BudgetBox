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
AWSCognito.config.region = 'us-west-2';
var poolData = {
    UserPoolId : 'us-west-2_jBbwrBRab', // your user pool id here pro240pool
    ClientId : 'urrkj1fg0ctc24k8um29ge3de' // your app client id here pro240client
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var cognitoUser;

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
	showNotLoggedInView();
    console.log('End of logout function');
};

function showNotLoggedInView(){
	console.log("executing showNotLoggedInView()...");
	$(".createAccountDiv").show();
	$(".logoutDiv").hide();
    console.log('End of showNotLoggedInView function');
}

function showLoggedInView(){
	console.log("executing showLoggedInView()...");
	$(".createAccountDiv").hide();
    $("#usernameDiv").html(cognitoUser.getUsername())
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
	console.log('user name is ' + cognitoUser.getUsername());
    
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
	var authenticationData = {
        Username : 'username',
        Password : 'password',
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var userData = {
        Username : 'username',
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
 
            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = '<region>';
 
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : '...', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
                }
            });
            
            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
                if (error) {
                     console.error(error);
                } else {
                     // Instantiate aws sdk service objects now that the credentials have been updated.
                     // example: var s3 = new AWS.S3();
                     console.log('Successfully logged!');
                }
            });
        },
 
        onFailure: function(err) {
            alert(err);
        },
 
    });
}

showNotLoggedInView();