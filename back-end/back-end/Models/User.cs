using System;
using System.Collections.Generic;
using System.Collections;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace back_end.Models
{
    public partial class User
    {
        public User()
        {
            Documents = new HashSet<Document>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Fullname { get; set; }
        [Required]
        public string Email { get; set; }
        public DateTime? DateBirthday { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Role { get; set; }
        public BitArray EmailConfirmed { get; set; }
        public DateTime ConfirmedOn { get; set; }

        public virtual ICollection<Document> Documents { get; set; }
    }
}
