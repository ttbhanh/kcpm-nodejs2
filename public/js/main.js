$(document).ready(function () {
  $(".delete-comment").on("click", function () {
    var id = $(this).data("id");
    var article = $(this).data("article");
    var url = "/comments/" + id;

    if (confirm("Delete comment?")) {
      $.ajax({
        url: url,
        type: "delete",
        success: () => {
          window.location.href = "/articles/" + article;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  });
});

function setActiveMenu(menuId) {
  document.querySelectorAll(`#${menuId} a`).forEach((item) => {
    item.parentElement.classList.remove("active");
    item.classList.remove("active");
    if (item.href == document.location.href) {
      item.parentElement.classList.add("active");
    }
  });
}
