// jshint esversion: 6
(function() {
    /**
	 * Git class
	 * A Git repository.
	 *
	 * @param {string} name	 name of repo.
    */
    class Git {
        constructor(name) {
            this.name = name;
            this.lastCommitId = -1;
            this.branches = [];
            let master = new Branch("master", null);
            this.branches.push(master);
            this.HEAD = master;
        }

        /**
        * Checkout method
        * switch to another branch
        *
        * @param {string} branchName   name of branch
        */
       checkout(branchName) {
           this.branches.forEach(branch => {
               if(branch.name === branchName) {
                   console.log(`Switching to existing branch: ${branchName}`);
                   this.HEAD = branch;
                   return this;
               }
           });

           let newBranch = new Branch(branchName, this.HEAD.commit);
           this.branches.push(newBranch);
           this.HEAD = newBranch;
           console.log(`Switched to new branch: ${newBranch}`);
           return this;
       }
       // git checkout existing-branch
       // git checkout -b new-branch

        /**
         * Make a commit.
         * @param  {string} message Commit message.
         * @return {Commit}         Created commit object.
        */
        commit(message) {
            let commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);
            this.HEAD.commit = commit;
            return commit;
        }

        /**
         * Get a log.
         * @return {Array}     Commits in reverse chronological order
        */
        log() {
            let history = [],
                commit = this.HEAD.commit;
            while(commit) {
                history.push(commit);
                commit = commit.parent;
            }
            return history;
        }
    }
    
    /**
	 * Commit class
	 * A single commit.
	 *
	 * @param {number} id  		 ID of commit.
     * @param {Commit} parent    Parent Commit
	 * @param {string} msg 		 Commit message.
	 */
    class Commit {
        constructor(id, parent, message) {
            this.id = id;
            this.parent = parent;
            this.message = message;
        }
    }

    /**
    * Branch class
    * set branch
    *
    * @param {string} name      name the branch
    * @param {Commit} commit    get the lastest commit
    */
    class Branch {
        constructor(name, commit) {
            this.name = name;
            this.commit = commit;
        }
    }

    // expose Git class to window
    window.Git = Git;
    
    let repo = new Git("my-repo");
    // command: git init
    repo.commit("initial commit");
    // command: git commit -m "initial commit"
    repo.checkout("master");
})();

