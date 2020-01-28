using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlueGrass.PeopleDirectory.UI.Utilities
{
    public class Constants
    {
        public const string AddCityStoredProcedure = "spAddCity";
        public const string AddCountryStoredProcedure = "spAddCountry";
        public const string AddPeopleDetailsStoredProcedure = "spAddPeopleDetails";
        public const string GetPeopleDetailsStoredProcedure = "spGetPeopleDetails";
        public const string GetPeopleDetailsByIdStoredProcedure = "spGetPeopleDetailsById";
        public const string UpdatePeopleDetailsStoredProcedure = "spUpdatePeopleDetails";
        public const string DeletePeopleDetailsStoredProcedure = "spDeletePeopleDetails";
        public const string GetCountrysStoredProcedure = "spGetCountries";
        public const string GetCitysStoredProcedure = "spGetCityByCountryId";
    }
}
