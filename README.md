# nu-aws-repos-template
AnthillPro project: https://anthillweb.se.newsint.co.uk/tasks/project/ProjectTasks/viewDashboard?projectId=1061

# Project Repository structure
This document describes the structure of the project repositories used for projects deployed using Cloudmatic.
This README might not be up to date: for the latest version, please check: https://nidigitalsolutions.jira.com/wiki/display/GGDIG/Project+Repository+Structure


## Repository Structure
The following folders are present in a typical Cloudmatic project repository:
* cfm: Cloudformation templates
* config: Infrastructure configuration.
* packer: Packer files defining the AMIs to bake for the project.
* scripts: Scripts to handle the deployment in AHP and also Application/Project specifics for pre-install and post-install actions. In general any script which is related with the infrastructure one way or another, unlike any scripts in src folder which would be application specific only.
* src: Application source code itself. It must be infrastructure agnostic and avoid any direct dependencies with the rest of the infrastructure.

### CloudFormation Templates (cfm)
This folder stores different cloudformation templates that are used to deploy the infrastructure. There are several templates types:
* Root Template: This is the master root template which links directly to all the other templates to which it pases their parameters. It also defines the order in which the other templates are run. This is the only template that has tokens on it.
* VPC Template: This template defines the VPC structure, including subnets, routing tables and NAT machines.
* App Template: This template define the project application infrastructure. It is unique per project although they are all quite similar in structure and content.

### Configuration (config)
This folder stores the configuration files of the project. There are two kind of files, the root and the environment specific ones. It also stores some other folders using for the project configuration.
* Files: This are configuration files (final or templates) to be copied over preexisting files in the instances or non existing ones. The location of the file is autodefined in the relative path being file the new root.
* Keys: This folder contains keys to be append into the instances. This only applies to the instances itself and not the NAT instances which require keys to be added manually. This mechanism is nevertheless deprecated and a newest system will be available soon. Please refer to it if is available by the time you read this document.
* Model: This folder contains the actual attribute files which work like parameters of the project. It is one of the most important sections of the whole repository. There is one attribute file per environment (folder name corresponds to the environment) and one general attribute file of the project.

The precedence is as follow (from less to more):
* Environment file
* Root attribute file
* AntHill Pro defined attributes
 
 
### Packer
This folder holds packer files to generate and bake the AMIs of the projects. For a more detailed reference please check in the packer specific section https://nidigitalsolutions.jira.com/wiki/display/GGDIG/Anthill+Pro+-+Packer+Workflow.


### Scripts
This folder holds a collection of scripts used for the deployment and installation of the application. They are both generic and application specific. Any deployment logic must be placed into this folder instead of the src one. Let's analyze the most important scripts and folders:
* manifest: This file has a list of files to be detokenized as part of the S3 Pull Deploy process. It also configures autodeploy and in which environments is this to happen.
* pre-install: This scripts are run in sequential order (alphabetical order) prior to the s3pulldeploy install.
* post-install: This scripts are run in sequential order (alphabetical order) after the s3pulldeploy install.
* cfm-deploy: (deprecated, will be removed soon) This script is used by AntHillPro to deploy Cloudformation
* copy_ami: (deprecated, will be removed soon) This script is used by AntHillPro to copy the project AMI into the Staging and Production accounts.
* detokenize: (deprecated, will be removed soon) This script is used to detokenize the attributes in the configuration and cloudformation folders or any other file being detokenized.

### Source Code (src)
This folder contains the application code itself. It should be detached from the rest of the repository in a way that there is no direct dependencies between them. That means that source code files are totally unaware of the structure of the repository. This is because code build/deployment in future may be separated from infrastructure one. However other sections of the repository such as scripts or configuration may be aware of particularities of the source code.
