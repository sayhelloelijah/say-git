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
            this.HEAD = null;
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
	 * Make a commit.
	 * @param  {string} message Commit message.
	 * @return {Commit}         Created commit object.
	 */
    Git.prototype.commit = function(message) {
        let commit = new Commit(++this.lastCommitId, this.HEAD, message);
        this.HEAD = commit;
        return commit;
    };

    /**
	 * Get a log.
	 * @return {Array}     Commits in reverse chronological order
	 */
    Git.prototype.log = function() {
        let history = [],
            commit = this.HEAD;
        while(commit) {
            history.push(commit);
            commit = commit.parent;
        }
        return history;
    };

    // expose Git class to window
    window.Git = Git;
    
    let repo = new Git("my-repo");
    // command: git init
    repo.commit("initial commit");
    // command: git commit -m "initial commit"
})();

