# Deployment Configuration

## Environment Variables

To configure the deployment workflow, you need to set the following environment variables in your GitHub repository settings:

1. **USER_NAME**: The name of the user who will be the author of the commits.
2. **USER_EMAIL**: The email address of the user who will be the author of the commits.
3. **REPO_NAME**: The full name of the repository (e.g., `username/repo`).

These variables should be configured under **Settings > Secrets and variables > Actions > Variables**.

4. **SSH_PROD_KEY**: The SSH key used for authentication with the production repository. This should be created under **Settings > Secrets and variables > Actions > Secrets**.

### Creating the Workflow

Once the environment variables are set, create a file named `workflow.yaml` in the `.github/workflows/` directory of your repository. This file will configure the GitHub Action that handles the deployment process.

Make sure to push your changes to the main branch to trigger the workflow.
