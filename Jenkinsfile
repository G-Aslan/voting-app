pipeline {
    agent any 

    stages {
        stage('Build Web App Docker Image') {
            steps {
                dir('web-app') {
                    script {
                        // Build Docker image for web-app
                        sh 'docker build -t giladaslan9/web-app:latest .'
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    script {
                        // Build Docker image for backend
                        sh 'docker build -t giladaslan9/backend:latest .'
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // Push web-app image
                    sh 'docker push giladaslan9/web-app:latest'
                    // Push backend image
                    sh 'docker push giladaslan9/backend:latest'
                }
            }
        }
    }

    post {
        always {
            // Clean up
            sh 'docker rmi giladaslan9/web-app:latest || true'
            sh 'docker rmi giladaslan9/backend:latest || true'
        }
    }
}

