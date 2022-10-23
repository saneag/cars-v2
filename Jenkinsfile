pipeline {
    agent any

    tools {
        nodejs "node"
    }

    environment {
        ON_SUCCESS_SEND_EMAIL = true
        ON_FAILURE_SEND_EMAIL = true
    }

    stages {
        stage('Delete workspace') {
            when {
                expression { CLEAN_WORKSPACE == "true"}
            }
            steps {
                deleteDir()
            }
        }
        stage('Build') {
            steps {
                bat 'npm install'
                bat 'npm install --prefix ./client'
                bat 'npm install --prefix ./server'
            }
        }
        stage('Testing backend') {
            steps {
                bat 'npm test --prefix ./server'
                junit allowEmptyResults: true, testResults: 'server/test-results.xml'
            }
        }
        stage('Testing frontend') {
            when {
                expression { TESTING_FRONTEND == "true" }
            }
            steps {
                echo "Testing frontend ${TESTING_FRONTEND}"
            }
        }
    }
    post {
        failure {
            mail to: "alexandrgarstea@gmail.com",
            subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}, ${env.BUILD_NUMBER}",
            body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}"
        }
        success {
            mail to: "alexandrgarstea@gmail.com",
            subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}, ${env.BUILD_NUMBER}",
            body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}"
        }
    }
}