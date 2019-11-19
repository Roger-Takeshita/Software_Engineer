# Bootcamp Software Engineer Immersive  - General Assembly Nov/2019

# Links
* [Homebrew](https://brew.sh/)
* [VSCode](https://code.visualstudio.com/)
* [iTerm2](https://iterm2.com/)
* [iTerm2 Configuration](https://www.freecodecamp.org/news/how-to-configure-your-macos-terminal-with-zsh-like-a-pro-c0ab3f3c1156/)
* [iTerm2 Themes](https://iterm2colorschemes.com/)
* [Zshell](https://ohmyz.sh/)
* [Zshell Agnoster Theme - Discussion](https://gist.github.com/agnoster/3712874)
* [Zshell Agnoster Theme - Extra Config](https://github.com/agnoster/agnoster-zsh-theme/issues/39)
* [Zshell Dracula Theme](https://draculatheme.com/zsh/)
* [imgur](https://imgur.com)

# <h1 id="summary">Summary</h1>
* [XCode and Command Line Tools](#xcode)
* [Homebrew](#homebrew)
* [VSCode](#vscode)
* [Alias](#alias)
* [Git](#git)
* [Node.js](#node)
* [PostgreSQL](#postgresql)
* [MongoDB](#mongodb)
* [Python](#python)
* [Django](#django)
* [Spectacle](#spectacle)
* [imgur](#imgur)

# <h1 id="xcode">XCode and Command Line Tools</h1>

[Go Back To Summary](#summary)

## **Setup**

* On terminal, type:

   ```
      xcode-select --install
   ```

* It will pop up a dialog box like the following.

   ![](https://raw.githubusercontent.com/bitmakerlabs/python-dev-setup-guide-mac/master/assets/xcode.png)

* Check if it was successfully installed, run:

   ```bash
      xcode-select -p
   ``` 

* It should show the directory where Xcode is installed.

# <h1 id="homebrew">Homebrew</h1>

[Go Back To Summary](#summary)


## **Setup**

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

* To make sure Homebrew installed, run:

   ```
      brew doctor
   ```

* If brew doctor says `Your system is ready to brew`, then everything worked properly.

## **Update Homebrew**

* In the future, run brew update to get the latest Homebrew formulas, and brew upgrade to update to the latest versions of installed applications.

   ```
      brew install wget
   ```

# <h1 id="vscode-default-editor">Set VSCode as Default Editor</h1>

[Go Back To Summary](#summary)

## **MAC**

### **Setup**

   ```
   brew cask install visual-studio-code
   ```

* **In terminal**
   1) Type: `open ~/.bash_profile`
   2) Delete everything and insert: `export EDITOR="code -w"`

* **In visual studio code**

   1) Press: `CMD + SHIFT + P`
   2) Insert: install code and select from autocomplete menu shell command: `Install 'code'` in command PATH

# <h1 id="alias">Alias</h1>

[Go Back To Summary](#summary)

Create shortcuts for terminal Bash or Zshel.

## **Zshell**

* Open terminal, type:

   ```bash
      code ~/.zshrc
   ```

* Add your shortcuts:

   ```bash
      alias z="code ~/.zshrc"
      alias sz="source ~/.zshrc"
      alias ls="ls -al"
      export EDITOR="code -w"
   ```

* After you finish editing your `.zshrc` reload the file:

   ```bash
      source ~/.zshrc
   ```

## **Bash**

* Open terminal, type:

   ```bash
      code ~/.bash_profile
   ```

* Add your shortcuts:

   ```bash
      alias b="code ~/.bash_profile"
      alias sb="source ~/.bash_profile"
      alias ls="ls -al"
      export EDITOR="code -w"
   ```

* After you finish editing your `.bash_profile` reload the file:

   ```bash
      source ~/.bash_profile
   ```

# <h1 id="git">Git</h1>

[Go Back To Summary](#summary)

## **Setup**

* On terminal, type:

   ```bash
      brew install git
   ```

* Create a global `.gitignore` global file:
   ```bash
     touch ~/.gitignore_global
   ```

* Set as a defaul file:

   ```bash
      git config --global core.excludesfile ~/.gitignore_global
   ```

* Add the following files and extensios:

   ```sh
      # This is a list of rules for ignoring files in every Git repositories on your computer.
      # See https://help.github.com/articles/ignoring-files

      # Compiled source #
      ###################
      *.class
      *.com
      *.dll
      *.exe
      *.o
      *.so

      # Packages #
      ############
      # it's better to unpack these files and commit the raw source
      # git has its own built in compression methods
      *.7z
      *.dmg
      *.gz
      *.iso
      *.jar
      *.rar
      *.tar
      *.zip

      # Logs and databases #
      ######################
      *.log

      # OS generated files #
      ######################
      ._*
      .DS_Store
      .DS_Store?
      .Spotlight-V100
      .Trashes
      ehthumbs.db
      Thumbs.db

      # Testing #
      ###########
      .rspec
      capybara-*.html
      coverage
      pickle-email-*.html
      rerun.txt
      spec/reports
      spec/tmp
      test/tmp
      test/version_tmp

      # node #
      ########
      node_modules

      # CTags #
      #########
      tags

      # Env #
      #######
      .env

      # Python #
      #######
      *.pyc
      __pycache__/
   ```
# <h1 id="node">Node.js</h1>

[Go Back To Summary](#summary)

Node is a JavaScript engine for the backend. We use it to power our web servers and connect to our databases.

## **Setup**

* On terminal, type:

   ```
      brew install node
   ```

* Verify the installation afterwards by running:

   ```
      node -v
      npm -v
   ```

* The above commands should display versions without any errors. To verify that all the required permissions are set correctly, try to install a package such as the useful nodemon globally:

   ```
      npm install -g nodemon
   ```

# <h1 id="postgresql">PostgreSQL</h1>

[Go Back To Summary](#summary)

## **Setup**

* Install the PostgreSQL database mangement system (DBMS) using Homebrew with this command:

   ```
      brew install postgresql
   ```

* After Postgres is installed run this command:

   ```
      brew services start postgresql
   ```

* Followed by this command to test the install by creating a new database named the same as the current system user:

   ```
      createdb
   ```

# <h1 id="mongodb">MongoDB</h1>

[Go Back To Summary](#summary)


This is a custom [Homebrew](https://brew.sh) tap for official MongoDB software.

## **Setup**

* You can add the custom tap in a MacOS terminal session using:

   ```
      brew tap mongodb/brew
   ```

## **Installing Formulae**

Once the tap has been added locally, you can install individual software packages with:

* Install the latest available production release of MongoDB Community Server ([including all command line tools](https://docs.mongodb.com/manual/reference/program/)). This will currently install MongoDB 4.2.x:

   ```
      brew install mongodb-community
   ```

## **Default Paths for the mongodb-community Formula**

In addition to installing the MongoDB server and tool binaries, the `mongodb-community` formula creates:

* a configuration file: `/usr/local/etc/mongod.conf`
* a log directory path: `/usr/local/var/log/mongodb`
* a data directory path: `/usr/local/var/mongodb`

## **Starting the mongodb-community Server**

### **Run `mongod` as a service**

* To have `launchd` start `mongod` immediately and also restart at login, use:

   ```
      brew services start mongodb-community
   ```

* If you manage `mongod` as a service it will use the default paths listed above. To stop the server instance use:

   ```
      brew services stop mongodb-community
   ```

### **Start `mongod` manually**

* If you don't want or need a background MongoDB service you can run:

   ```
      mongod --config /usr/local/etc/mongod.conf
   ```

* Note: if you do not include the `--config` option with a path to a configuration file, the MongoDB server does not have a default configuration file or log directory path and will use a data directory path of `/data/db`.
* To shutdown `mongod` started manually, use the `admin` database and run `db.shutdownServer()`:

   ```
      mongo admin --eval "db.shutdownServer()"
   ```

## **Additional Information**

* This tap was created using the Homebrew documentation on [How to Create and Maintain a tap](https://github.com/Homebrew/brew/blob/master/docs/How-to-Create-and-Maintain-a-Tap.md).
* You can find additional information in the [Homebrew project README](https://github.com/Homebrew/brew#homebrew).

# <h1 id="python">Python 3</h1>

[Go Back To Summary](#summary)

Brew is also used to install Python 3. (Python 2 is already installed on your Mac.)

## **Setup**
* Install Python using Homebrew with this command:

   ```
      brew install python.
   ```

* You can test the installation by running

   ```
      python3 --version.
   ```

* Python 3's package manager, `pip3` should have automatically been installed with Python 3. Test that it was installed by running

   ```
      pip3 --version.
   ```

# <h1 id="django">Django</h1>

[Go Back To Summary](#summary)

We will use pip3 to install Django, a robust web framework for Python. We will be installing the latest version (2.x.x):

## **Setup**

* On terminal, type:

   ```
      pip3 install Django
   ```

* You need to have Django installed in order to create new Django projects. After the project is created (or if you're working with an existing Django project), you'll be using the bundled versions of Django specific to your project.

   ```bash
      pip install Django
   ```

* **Never run sudo in front of these pip commands**, or it may install to the wrong folder.
* Django might take a while to install. When the installation is done, you can look at your installed Python modules by running

   ```bash
      pip list
   ```

* Verify that Django is there and that the version is at least `2.1.4`. Run:

   ```bash
      django-admin --version
   ```

* It should say (at least) `2.1.4`.

## **Making a New Django Project**

* You should create a directory where you can put all of your work. Run:

   ```bash
      mkdir ~/Documents/work
   ```

* This will create a `work` directory inside the OS X `Documents` folder. The words 'directory' and 'folder' are interchangeable. 'Folder' is the word generally used by non-technical people and 'directory' is the word generally used by technical people. Now that you are being initiated as techies, we'll use the 'directory' term!
* The `~` symbol refers to your [Home Directory](http://superuser.com/questions/158721/what-does-mean-in-terms-of-os-x-folders-directories). You should put all of your work for this course inside the work directory, or some other directory of your choosing if you have another preference.
* Go inside your work directory:

   ```bash
      cd ~/Documents/work
   ```

* and then make a new Django project:

   ```bash
      django-admin startproject my_awesome_app
   ```

* This step will probably take a few minutes the first time you create a new Django project. The next time, it'll run much faster.

## **Running a Django project**

* Next, go into your new project directory

   ```bash
      cd my_awesome_app
   ```

* then run:

   ```bash
      python manage.py runserver
   ```

* Visit `http://localhost:8000` in your browser. If you see the **The install worked successfully! Congratulations!** page, congrats – Django works!
* You can type `ctrl + c` into your terminal to stop the Django application.
* In this course, you're going to be running the `python manage.py runserver` and `ctrl + c` commands very, very often, so go ahead and memorize them now!

## **Editing a Django project**

* Finally, you can open up the project files in VS Code with the following command:

   ```bash
      code .
   ```

* The `.` symbol means 'this directory', so the command means 'open VS Code in this directory'.
* Poke around the project files as much as you like. Soon we'll be learning all about what makes a Django app tick. Isn't it exciting?
* Now, close the editor and continue to the next step.

## **Delete the new Django project**

* To keep your work directory clean, let's delete the new project you just created.
* You are currently in your project directory. Check that by running:

   ```bash
      pwd
   ```

* It should say something like `/Users/username/Documents/work/my_awesome_app`.
* Let's go back up one directory, to your work directory.

   ```bash
      cd ..
   ```

* Double check where you are:

   ```bash
      pwd
   ```

* It should say something like `/Users/username/Documents/work`.
* Double check the contents of the directory

   ```bash
      ls
   ```

* If you've followed all the directions so far, there should only be single item called `my_awesome_app`. Go ahead and delete this project, it has served its purpose.

   ```bash
      rm -r my_awesome_app
   ```

* Be careful running this `rm -r` command! It's a command you need to learn, but always double and triple check what you're deleting. [More information on the rm -r command](http://stackoverflow.com/questions/29363445/what-is-exactly-doing-rm-r)

# <h1 id="spectacle">Spectacle</h1>

[Go Back To Summary](#summary)

* Install [Spectacle](https://www.spectacleapp.com/) for resizing windows.
* This free "productivity" tool is invaluable when it comes to minimizing the time spent sizing windows using the mouse.

# <h1 id="imgur">imgur</h1>

[Go Back To Summary](#summary)

* Create an account on [imgur.com](https://imgur.com/) and install [mac2imgur](https://github.com/mileswd/mac2imgur) to ease uploading screenshots and other images from your computer to your imgur account.