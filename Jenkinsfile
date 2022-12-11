pipeline {
    agent any

    tools {
        nodejs "node"
    }

    environment {
        ON_SUCCESS_SEND_EMAIL = true
        ON_FAILURE_SEND_EMAIL = true
    }
    parameters {
        booleanParam(name: 'CLEAN_WORKSPACE', defaultValue: false, description: 'Clean workspace before build')
        booleanParam(name: 'TESTING_FRONTEND', defaultValue: false, description: 'Testing frontend')
    }
    stages {
        stage('Clean workspace') {
            when {
                expression { params.CLEAN_WORKSPACE}
            }
            steps {
                deleteDir()
            }
        }
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: '75999002-a88a-439d-adbf-6a600429eed8', url: 'https://github.com/saneag/cars-v2.git'
            }
        }
        stage('Install') {
            steps {
                bat 'npm install && npm install --prefix ./client && npm install --prefix ./server'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build --prefix ./client'
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
                expression { params.TESTING_FRONTEND }
            }
            steps {
                echo "Testing frontend ${TESTING_FRONTEND}"
            }
        }
        stage('Continuous Delivery') {
            steps {
                bat "ssh -p 2222 alex@localhost 'docker pull saneag/backend:latest && docker pull saneag/frontend:latest'"
            }
        }
        stage('Continuous Deployment') {
            steps {
                sh 'ssh -p 2222 alex@localhost docker-compose up -d'
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