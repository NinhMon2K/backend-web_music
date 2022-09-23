using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace QLApp.Library.Service.Interface
{
    public interface IDataService
    {

        string ConnectionString { get; set; }
        string GetDefaultConnectionString();
        IDbConnection CreateConnection();
        Task<IDbConnection> CreateConnectionAsync();

        int GetDefaultTimeout();

        Task<IList<T>> GetDataAsync<T>(string procedureName, object[] parameters);
        Task<IList<T>> GetDataAsync<T>(string procedureName, object parameters);
        IList<T> GetData<T>(string procedureName, object[] parameters);

        Task<IList<T>> GetDataAsync<T>(string procedureName, IList<dynamic> parameters);
        IList<T> GetData<T>(string procedureName, IList<dynamic> parameters);

        bool ExcuteSave(string procedureName, object entity, IDbTransaction dbTransaction = null);
        bool ExcuteSave(string procedureName, object[] parameter, IDbTransaction dbTransaction = null);
        Task<bool> ExcuteSaveAsync(string procedureName, object entity, IDbTransaction dbTransaction = null);
        Task<bool> ExcuteSaveAsync(string procedureName, object[] parameter, IDbTransaction dbTransaction = null);
        Task<object> ExcuteScalarAsync(string procedureName, object entity, IDbTransaction dbTransaction = null);
        Task<object> ExcuteScalarAsync(string procedureName, object[] parameter, IDbTransaction dbTransaction = null);
        object ExcuteScalar(string procedureName, object entity, IDbTransaction dbTransaction = null);
        object ExcuteScalar(string procedureName, object[] parameter, IDbTransaction dbTransaction = null);

        Task<bool> ExcuteDeteteAsync(string procedureName, object[] parameter, IDbTransaction dbTransaction = null);
        bool ExcuteDetete(string procedureName, object[] parameter, IDbTransaction dbTransaction = null);

        Task<T> GetObjectAsync<T>(string procedureName, object[] parameter);
        T GetObject<T>(string procedureName, object[] parameter);

    }
}
