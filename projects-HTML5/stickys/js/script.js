var db = null;

if( window.openDatabase ) {
    db = openDatabase('NoteTest', '1.0', 'Stickys Database', 10000000);
    if ( !db ) {
        alert('Failed to open database');
    }
} else {
    alert('Failed to open database, make sure your browser supports HTML5 web storage.');
}

function Note() {
    var self = this;
    
    var note = document.createElement( 'div' );
    note.className = 'note';
    
    note.addEventListener('mousedown', function( event ) {
        return self.onMouseDown( event );
    }, false);
    note.addEventListener('click', function() {
        return self.onNoteClick();
    }, false);
    this.note = note;
    
    var close = document.createElement( 'div' );
    close.className = 'close-btn';
    
    close.addEventListener('click', function( event ) {
        return self.close( event );
    },false);
    
    note.appendChild( close );
    
    var edit = document.createElement( 'div' );
    edit.className = 'edit';
    edit.setAttribute('contenteditable', false);
    
    edit.addEventListener('keyup', function() {
        return self.onKeyUp();
    }, false);
    note.appendChild( edit );
    this.editField = edit;
    
    var ts = document.createElement( 'div' );
    ts.className = 'timestamp';
    
    ts.addEventListener('mousedown', function( event ) {
        return self.onMouseDown( event );
    }, false);
    note.appendChild( ts );
    this.lastModified = ts;
    
    document.body.appendChild( note );
    return this;
}

Note.prototype = {
    get id() {
        if( !('_id' in this) ) {
            this._id = 0;
        }
        return this._id;
    },
    
    set id( x ) {
        this._id = x;
    },

    get text() {
        return this.editField.innerHTML;
    },

    set text( x ) {
        this.editField.innerHTML = x;
    },

    get timestamp() {
        if( !('_timestamp' in this) ) {
            this._timestamp = 0;
        }
        return this._timestamp;    
    },

    set timestamp( x ) {
        if ( this._timestamp === x ) {
            return;
        }
        
        this._timestamp = x;
        var date = new Date();
        date.setTime( parseFloat( x ) );
        this.lastModified.textContent = modifiedString( date );
    },

    get left() {
        return this.note.style.left;
    },

    set left( x ) {
        this.note.style.left = x;
    },
    
    get top() {
        return this.note.style.top;
    },

    set top( x ) {
        this.note.style.top = x;
    },
    
    get zIndex() {
        return this.note.style.zIndex;
    },

    set zIndex( x ) {
        this.note.style.zIndex = x;
    },
    
    onMouseDown: function( event ) {},
    
    close: function( event ) {
        this.cancelPendingSave();
        var note = this;
        
        db.transaction(function(tx) {
            tx.executeSql('DELETE FROM MyStickys WHERE id = ?', [note.id]);    
        });
        document.body.removeChild(this.note);
    },
    
    saveSoon: function() {
        this.cancelPendingSave();
        var self = this;
        this._saveTimer = setTimeout(function() {
            self.save();
        }, 200);
    },
    
    cancelPendingSave: function() {
        if( !('_saveTimer' in this) ) {
            return;
        }
        clearTimeout(this._saveTimer);
        delete this._saveTimer;
    },
    
    save: function() {
        this.cancelPendingSave();
        if( 'dirty' in this ) {
            this.timestamp = new Date().getTime();
            delete this.dirty;
        }
        
        var note = this;
        db.transaction(function(tx) {
            tx.executeSql('Update MyStickys SET note = ?, timestamp = ?, left = ?, top = ?, zindex = ? WHERE id = ?',
                         [note.text, note.timestamp, note.left, note.top, note.zIndex, note.id]);
        });
    },
    
    
    
    onNoteClick: function() {},
    
    onKeyUp: function() {},
    
    
};