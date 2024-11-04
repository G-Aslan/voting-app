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
                        // Build multi-platform Docker image for web-app
                        sh '''
                            docker buildx create --use --name mybuilder || true
                            docker buildx inspect mybuilder --bootstrap
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
                        // Build multi-platform Docker image for backend
                        sh '''
                            docker buildx create --use --name mybuilder || true
                            docker buildx inspect mybuilder --bootstrap
                            docker buildx build --platform linux/amd64,linux/arm64 -t giladaslan9/backend:latest --push .
                        '''
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // Push web-app image (already pushed during build)
                    // Push backend image (already pushed during build)
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
    
        success {
        // Trigger the "K8s - Connection and Configuration" pipeline
        build job: 'K8s - Connection and Configuration', wait: false
    }
}
