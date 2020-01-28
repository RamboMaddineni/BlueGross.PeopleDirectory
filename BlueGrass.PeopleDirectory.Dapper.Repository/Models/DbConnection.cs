namespace BlueGrass.PeopleDirectory.Dapper.Repository.Models
{
    public class DbConnection
    {
        public string ConnectionString { get; set; }
        public string StoredProcedure { get; set; }
        public object Parameters { get; set; }
    }
}
