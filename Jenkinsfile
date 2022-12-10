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
        stage('Install') {
            steps {
                bat 'npm install && npm install --prefix ./client && npm install --prefix ./server'
            }
        }
        stage('VM login') {
        	steps {
        		bat 'ssh -p 2222 alex@localhost &&     '
        	}
        }
        stage('Docker compose') {
		steps {
			sh 'docker compose up'
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