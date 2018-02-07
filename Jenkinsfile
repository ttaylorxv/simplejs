#!groovy
import hudson.model.*


try {
    node {
       
        def branch = BRANCH_NAME.toLowerCase();
        def source = BRANCH_NAME
        if (branch.contains('/')){
            branch = branch.substring(branch.lastIndexOf("/") + 1)
        }
            
        if (!branch.equalsIgnoreCase("master")){
        
        stage('checkout-and-test') {
            checkout scm
      
            sh """oc process -f nodejs-mongo-jenkinspipe.json -p NAME=$branch -p SOURCE_REPOSITORY_URL=https://github.com/ttaylorxv/tickHW.git -p SOURCE_REPOSITORY_REF=$source -p DATABASE_NAME=$branch -p DATABASE_SERVICE_NAME=$branch-mongodb -lapp=$branch | oc apply -f - """
           
            openshiftBuild apiURL: '', authToken: '', bldCfg: """$branch""", buildName: '', checkForTriggeredDeployments: 'true', commitID: '', namespace: '', showBuildLogs: 'true', verbose: 'false', waitTime: '', waitUnit: 'sec'
            

        }
        /*stage('Deploy to Test Environment for $branch') {
            openshiftDeploy depCfg: """$branch""", verbose: 'false'
            openshiftVerifyDeployment depCfg: """$branch""", verbose: 'false'
        }*/


        } else {
        
        
        stage('Build') {
            openshiftBuild apiURL: '', authToken: '', bldCfg: 'simple-nodejs-dev', buildName: '', checkForTriggeredDeployments: 'true', commitID: '', namespace: '', showBuildLogs: 'true', verbose: 'false', waitTime: '', waitUnit: 'sec'
            openshiftVerifyBuild bldCfg: 'simple-nodejs-dev', checkForTriggeredDeployments: 'true', showBuildLogs: 'true', verbose: 'false'

            openshiftTag alias: 'false', destStream: 'simple-nodejs-dev', destTag: 'dev', srcStream: 'simple-nodejs-dev', srcTag: 'latest', verbose: 'false'
        }
        stage('Deploy to Dev') {
            openshiftDeploy depCfg: 'simple-nodejs-dev', verbose: 'false'
            openshiftVerifyDeployment depCfg: 'simple-nodejs-dev', verbose: 'false'
            
            openshiftTag alias: 'false', destStream: 'simple-nodejs-dev', destTag: 'qa', srcStream: 'simple-nodejs-dev', srcTag: 'dev', verbose: 'false'
        }
        stage('Approve QA Deployment') {
            timeout(time: 2, unit: 'DAYS') {
                input message: 'Do you want to deploy into Q&A?'
            }
        }
        // Publish to a QA environment
        stage('Deploy to QA') {
            openshiftDeploy depCfg: 'simple-nodejs-qa', verbose: 'false'
            openshiftVerifyDeployment depCfg: 'simple-nodejs-qa', verbose: 'false'

            openshiftTag alias: 'false', destStream: 'simple-nodejs-dev', destTag: 'prod', srcStream: 'simple-nodejs-dev', srcTag: 'qa', verbose: 'false'
        }
        // Wait until authorization to push to production
        stage('Approve Production Deployment') {
            timeout(time: 2, unit: 'DAYS') {
                input message: 'Do you want to deploy into production?'
            }
        }
        // Push to production
        stage('Deploy to Production') {
            openshiftDeploy depCfg: 'simple-nodejs-dev', verbose: 'false'
            openshiftVerifyDeployment depCfg: 'simple-nodejs-dev', verbose: 'false'
            
        } 
        }
    }
} catch (err) {
    echo "in catch block"
    echo "Caught: ${err}"
    currentBuild.result = 'FAILURE'
    throw err
}
