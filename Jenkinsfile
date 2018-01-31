#!groovy
import hudson.model.*


try {
    node {
        stage('Build') {
            openshiftBuild apiURL: '', authToken: '', bldCfg: 'simplejs-dev', buildName: '', checkForTriggeredDeployments: 'true', commitID: '', namespace: '', showBuildLogs: 'true', verbose: 'false', waitTime: '', waitUnit: 'sec'
            openshiftVerifyBuild bldCfg: 'simplejs-dev', checkForTriggeredDeployments: 'true', showBuildLogs: 'true', verbose: 'false'

            openshiftTag alias: 'false', destStream: 'simplejs-dev', destTag: 'dev', srcStream: 'simplejs-dev', srcTag: 'latest', verbose: 'false'
        }
        stage('Deploy to Dev') {
            openshiftDeploy depCfg: 'simplejs-dev', verbose: 'false'
            openshiftVerifyDeployment depCfg: 'simplejs-dev', verbose: 'false'
            
            openshiftTag alias: 'false', destStream: 'simplejs-dev', destTag: 'qa', srcStream: 'simplejs-dev', srcTag: 'dev', verbose: 'false'
        }
        stage('Approve QA Deployment') {
            timeout(time: 2, unit: 'DAYS') {
                input message: 'Do you want to deploy into Q&A?'
            }
        }
        // Publish to a QA environment
        stage('Deploy to QA') {
            openshiftDeploy depCfg: 'simplejs-qa', verbose: 'false'
            openshiftVerifyDeployment depCfg: 'simplejs-qa', verbose: 'false'

            openshiftTag alias: 'false', destStream: 'simplejs-dev', destTag: 'prod', srcStream: 'simplejs-dev', srcTag: 'qa', verbose: 'false'
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
            openshiftVerifyDeployment depCfg: 'simplejs-dev', verbose: 'false'
            
        } 
    }
} catch (err) {
    echo "in catch block"
    echo "Caught: ${err}"
    currentBuild.result = 'FAILURE'
    throw err
}
