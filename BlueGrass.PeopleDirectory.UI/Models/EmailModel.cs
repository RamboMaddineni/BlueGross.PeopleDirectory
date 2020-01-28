using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlueGrass.PeopleDirectory.UI.Models
{
    public class EmailModel
    {
        public string Body { get; set; }
        public string ToAddress { get; set; }
        public string Subject { get; set; }

        public string FromAddress { get; set; }
    }
}
