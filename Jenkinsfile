pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials'  // Jenkins credentials ID for Docker Hub
        GITHUB_CREDENTIALS = 'github-credentials'          // Jenkins credentials ID for GitHub
        FRONTEND_IMAGE = 'haiderzaidi123/dockerprojectpractice-frontend'
        BACKEND_IMAGE = 'haiderzaidi123/dockerprojectpractice-backend'
    }
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Checkout the code from GitHub
                    checkout scm
                }
            }
        }
        stage('Build Docker Image Backend') {
            steps {
                script {
                    // Build the Docker image for the backend
                    bat "docker build -t ${BACKEND_IMAGE} ./backend"  // Adjust the path to the backend directory
                }
            }
        }
        stage('Build Docker Image Frontend') {
            steps {
                script {
                    // Build the Docker image for the frontend
                    bat "docker build -t ${FRONTEND_IMAGE} ./frontend"  // Adjust the path to the frontend directory
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub using stored credentials
                    withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, 
                                                       usernameVariable: 'DOCKER_USER', 
                                                       passwordVariable: 'DOCKER_PASS')]) {
                        bat "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"
                    }
                }
            }
        }
        stage('Push Images to Docker Hub') {
            steps {
                script {
                    // Push the Docker images to Docker Hub
                    bat "docker push ${BACKEND_IMAGE}"
                    bat "docker push ${FRONTEND_IMAGE}"
                }
            }
        }
    }
    post {
        always {
            // Clean up the Docker images after the job completes
            bat "docker rmi ${FRONTEND_IMAGE}"
            bat "docker rmi ${BACKEND_IMAGE}"
        }
    }
}
