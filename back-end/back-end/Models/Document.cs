using System;
using System.Collections.Generic;

#nullable disable

namespace back_end.Models
{
    public partial class Document
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string NameFile { get; set; }
        public string Path { get; set; }

        public virtual User User { get; set; }
    }
}
