let childrenData = {
  webdevchildren: [
    {
      exam: "DHTML Suite for beginners",
      type: "Intro",
      dueDate: "23/06/2021",
      status: "Active",
      time: "10 min",
    },
    {
      exam: "Programming with HTML and CSS",
      type: "Intro",
      dueDate: "23/06/2021",
      status: "Active",
      time: "15 min",
    },
    {
      exam: "Javascript with JQuery",
      type: "Advanced",
      dueDate: "23/06/2021",
      status: "Active",
      time: "20 min",
    },
    {
      exam: "Introduction to Node.Js",
      type: "Intro",
      dueDate: "23/06/2021",
      status: "Hidden",
      time: "10 min",
    },
    {
      exam: "Bootstrap for Beginners",
      type: "Intermediate",
      dueDate: "23/06/2021",
      status: "Active",
      time: "30 min",
    },
  ],
  datatechchildren: [
    {
      exam: "MySQL and SQL",
      type: "Intermediate",
      dueDate: "23/06/2021",
      status: "Active",
      time: "20 min",
    },
    {
      exam: "Oracle PL/SQL",
      type: "Advanced",
      dueDate: "23/06/2021",
      status: "Active",
      time: "30 min",
    },
  ],
  mobiletechchildren: [
    {
      exam: "History of Mobile Devices",
      type: "Intro",
      dueDate: "23/06/2021",
      status: "Active",
      time: "10 min",
    },
  ],
};

function showChildren(children) {
  let htmlData = ``;
  childrenData[children].map((data, index) => {
    htmlData += `<tr>
            <td scope="row">${data.exam}</td>
            <td>
                <button class="blue-button">View Exam</button>
            </td>
            <td>${data.type}</td>
            <td>${data.dueDate}</td>
            <td>
                <button class="status-button">${data.status}</button>
            </td>
            <td>${data.time}</td>
						<td>
                <button onclick="showEditForm(${children}, ${index})">
									<img src="https://img.icons8.com/material-outlined/24/undefined/edit--v1.png"/>
								</button>
                <button onclick="showDeleteModal(${children}, ${index})">
									<img src="https://img.icons8.com/material-sharp/24/undefined/filled-trash.png"/>
								</button>
            </td>
            <!-- <td><img src="../img_167289.png" alt="no image"><img src="../delete-vector-icon.webp" alt="no image "></td> -->
        </tr>`;
  });
  document.getElementById(children).innerHTML = htmlData;
}

toggle = (children) => {
  var x = document.getElementById(children);
  if (x.style.display === "none") {
    showChildren(children);
    x.style.display = "table-row-group";
  } else {
    x.style.display = "none";
  }
};

generateEditForm = (editData, children, dataIndex) => {
  let editForm = `
	<div style="display: flex;justify-content: flex-end;margin-bottom: 1rem;">
		<button onclick="closeEditForm()" class="edit-close-button">&times;</button>
	</div>
	<div>
		<form name="editForm" onsubmit="return validateForm(${children}, ${dataIndex})" method="post" style="display: flex; flex-direction: column;padding: 0px 7px;">
			<span>Difficulty Level</span>
			<select name="type" style="margin-bottom: 1rem;">
				<option value="Intro" ${
          editData.type === "Intro" ? "selected" : ""
        }>Intro</option>
				<option value="Intermediate" ${
          editData.type === "Intermediate" ? "selected" : ""
        }>Intermediate</option>
				<option value="Advanced" ${
          editData.type === "Advanced" ? "selected" : ""
        }>Advanced</option>
			</select>
			<span>Due Date</span>
			<input type="date" name="dueDate" value=${
        new Date(
          editData.dueDate.split("/")[1] +
            "/" +
            editData.dueDate.split("/")[0] +
            "/" +
            editData.dueDate.split("/")[2]
        )
          .toISOString()
          .split("T")[0]
      } min=${
    new Date().toISOString().split("T")[0]
  } style="margin-bottom: 1rem;"/>
			<span>Average Test Time</span>
			<input type="text" name="time" style="margin-bottom: 1rem;" value="${
        editData.time
      }"/>
			<button type="submit" class="blue-button" style="margin-bottom: 1rem;height: 2rem;">Save</button>
		</form>
	</div>
	`;
  return editForm;
};

generateDeleteForm = (children, dataIndex) => {
  let deleteForm = `
	<span onclick="closeDeleteModal()" class="close" title="Close Modal">&times;</span>
	<form class="modal-content">
		<div class="container">
			<h1>Delete Exam</h1>
			<p>Are you sure you want to delete the exam - <b>${childrenData[children][dataIndex].exam}<b>?</p>

			<div class="clearfix">
				<button type="button" class="cancelbtn" onclick="return closeDeleteModal()">Cancel</button>
				<button type="button" class="deletebtn" onclick="return deleteData(${children}, ${dataIndex})">Delete</button>
			</div>
		</div>
	</form>
	`;
  return deleteForm;
};

getFormattedDate = (date) => {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
};

validateForm = (children, dataIndex) => {
  const form = document.forms["editForm"];
  let time = form["time"].value;
  let type = form["type"].value;
  let dueDate = form["dueDate"].value;
  if (time === "") {
    alert("Time must be filled out");
    return false;
  }
  childrenData[children.id][dataIndex] = {
    ...childrenData[children.id][dataIndex],
    type: type,
    time: time,
    dueDate: getFormattedDate(new Date(dueDate)),
  };
  document.getElementById("editform").style.display = "none";
  showChildren(children.id);
  return false;
};

showEditForm = (children, dataIndex) => {
  document
    .querySelectorAll(
      "#webdevchildren tr,#datatechchildren tr,#mobiletechchildren tr"
    )
    .forEach((t) => {
      t.style.backgroundColor = "white";
    });
  const editData = childrenData[children.id][dataIndex];
  var x = document.getElementById("editform");
  x.innerHTML = generateEditForm(editData, children.id, dataIndex);
  document.getElementById(children.id).childNodes[
    dataIndex
  ].style.backgroundColor = "wheat";
  if (x.style.display === "none") {
    x.style.display = "block";
    x.style.border = "2px solid wheat";
  }
};

closeEditForm = () => {
  document
    .querySelectorAll(
      "#webdevchildren tr,#datatechchildren tr,#mobiletechchildren tr"
    )
    .forEach((t) => {
      t.style.backgroundColor = "white";
    });
  document.getElementById("editform").style.display = "none";
};

showDeleteModal = (children, dataIndex) => {
  var x = document.getElementById("deleteModal");
  x.innerHTML = generateDeleteForm(children.id, dataIndex);
  x.style.display = "block";
};

closeDeleteModal = () => {
  document.getElementById("deleteModal").style.display = "none";
};

deleteData = (children, dataIndex) => {
  childrenData[children.id].splice(dataIndex, 1);
  showChildren(children.id);
  closeDeleteModal();
};

closeDeleteModal = () => {
  document.getElementById("deleteModal").style.display = "none";
};

if ( window.history.replaceState ) {
	window.history.replaceState( null, null, window.location.href );
}
