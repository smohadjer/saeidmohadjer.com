Deployment from Github to Live

The boilerplate offers automated updating of content on live Website. Every time a commit is pushed into master branch on github, a webhook is triggered which posts a request containing details of the commit to this payload url:

http://boilerplate.saeidmohadjer.com/deploy.php?sat=mySecretCode

The deploy.php on production server then runs a series of commands to fetch the changes from Github repository. For more info about how depoloy.php works see its own repository at: https://github.com/markomarkovic/simple-php-git-deploy/

For deploy.php to be able to fetch changes git should be installed on production server. Also since deploy.php clones github repository on production server github needs to have public ssh key of server's user added to repository's deploy keys and github should also be added to known_hosts of producton server. 

***Troubleshooting Deployment***

- If deployment fails with this error: 

  Host key verification failed.
  fatal: Could not read from remote repository.
  Please make sure you have the correct access rights and the repository exists.
  
This could be either because you have not added the public ssh key of your site to github or have not added github to known_hosts of your site or both.

- Login to Plesk, find the website that you are setting up deployment for, select "Webhosting-Zugang" and note username and password of system user. Make sure this user has ssh access to the server.

- Open your cli (Git Bash on Windows) and login to server via ssh using username and password of the system user. Run pwd to make sure you are in home directory of your site. Then use ls -al to see whether .ssh folder exists in your site directory or not. If not, generate ssh keys for this user in your site folder by running: "ssh-keygen -t rsa" and without setting a pass phrase. This will create private and public ssh keys in .ssh folder. Then copy the public ssh key (cat id_rsa.pub) and add it to your repository's Settings > Deploy keys. 

- If github has not been added to your remote directory's known_hosts then ssh to your server, cd to your site directory and add github to .ssh/known_hosts there by running: ssh-keyscan github.com >> .ssh/known_hosts
