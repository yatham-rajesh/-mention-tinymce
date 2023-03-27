
  // Define a regex pattern to match the user input
  var pattern = /\B@\w+/g;

  // Define a list of users for the autocomplete dropdown
  var users = [
    { name: 'Andrew', email: 'andrew@example.com', avatar: 'https://i.pravatar.cc/40?u=andrew' },
    { name: 'Bob', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/40?u=bob' },
    { name: 'Charlie', email: 'charlie@example.com', avatar: 'https://i.pravatar.cc/40?u=charlie' }
  ];
 
  // Define a function to create the autocomplete dropdown
  function createDropdown() {
    var dropdown = document.createElement('ul');
    dropdown.classList.add('mentions-dropdown');

    users.forEach(function(user) {
      var item = document.createElement('li');
      item.innerHTML = '<img src="' + user.avatar + '"> ' + user.name;
      item.addEventListener('mousedown', function(e) {
        e.preventDefault();
        insertLink(user);
      });
      dropdown.appendChild(item);
    });

    return dropdown;
  }

  // Define a function to insert the selected link
// Define a function to insert the selected link
function insertLink(user) {
    var caretIndex = editor.selection.getRng().endOffset;
    var textBeforeCaret = editor.getContent({format: 'text'}).substring(0, caretIndex);
    var searchTerm = textBeforeCaret.match(/@[\w\d\s]*/g);;
    console.log(searchTerm)
    if (match === null) {
      return; // return early if no match is found
    }
    match = match.pop(); // get the most recent match
  
    var link = '<a href="https://example.com/' + user.name + '">' + match + '</a>';
    content = content.replace(match, link); // replace the user input with the link
  
    editor.setContent(content);
    editor.focus();
  }
  

  // Register a listener for the "keyup" event
  editor.on('keypress', function(e) {
    if (e.key === '@') {
      var dropdown = createDropdown();
      editor.getContainer().appendChild(dropdown);
     // editor.setContent("content");
    } else {
      var dropdown = editor.getContainer().querySelector('.mentions-dropdown');
      if (dropdown) {
        dropdown.parentNode.removeChild(dropdown);
      }
    }
    

    var dropdownItems = editor.getContainer().querySelectorAll('.mentions-dropdown li');
    var searchTerm = e.target.innerText.match(pattern).pop().substring(1);
    dropdownItems.forEach(function(item) {
      var username = item.innerText.substring(item.innerText.indexOf(' ') + 1);
      if (username.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
  

  // Register a listener for the "blur" event
  editor.on('blur', function(e) {
    var dropdown = editor.getContainer().querySelector('.mentions-dropdown');
    if (dropdown) {
      dropdown.parentNode.removeChild(dropdown);
    }
  });