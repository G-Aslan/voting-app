pipeline {
    agent any 

    stages {
        stage('Login to Docker Hub') {
            steps {
                // Use credentials from Jenkins
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    script {
                        // Log in to Docker Hub
                        sh 'echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin'
                    }
                }
            }
        }

        stage('Build Web App Docker Image') {
            steps {
                dir('web-app') {
                    script {
                        // Build Docker image for web-app using Buildx
                        sh '''
                            docker buildx create --name mybuilder --use || true
                            docker buildx build --platform linux/amd64,linux/arm64 -t giladaslan9/web-app:latest --push .
                        '''
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    script {
                        // Build Docker image for backend using Buildx
                        sh '''
                            docker buildx create --name mybuilder --use || true
                            docker buildx build --platform linux/amd64,linux/arm64 -t giladaslan9/backend:latest --push .
                        '''
                    }
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
