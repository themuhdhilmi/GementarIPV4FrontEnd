pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning the repository...'
                checkout scm
            }
        }

        stage('Set Environment Variable') {
            steps {
                script {
                    // Write the .env file with the provided environment variables
                    writeFile file: '.env', text: """
                    AUTH_SECRET=${AUTH_SECRET}
                    DATABASE_URL=${DATABASE_URL}
                    NEXTAUTH_URL=${NEXTAUTH_URL}
                    """
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Database') {
            steps {
                echo 'Building the database...'
                sh 'npx prisma db push'
            }
        }

        stage('Build Next.js Project') {
            steps {
                echo 'Building the project...'
                sh 'npm run build'
            }
        }
    }
}
