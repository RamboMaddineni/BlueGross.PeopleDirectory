using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlueGrass.PeopleDirectory.UI.Models
{
    public class AdminModel
    {

        [Required]
        public string AdminName { get; set; }

        [Required]
        public string AdminPassword { get; set; }
    }
}
