using QLApp.Core.Entities;
using QLApp.Core.Service;
using QLApp.Library.Service.Interface;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace QLApp.Library.Service.Implementtion
{
    public class DataService : IDataService
    {

        private IDataAccess _dataAccess;
        private IConfigService _configService;
        private string _connectionString;
        private int? _timeout;

        public int? CommandTimeout
        {
            get => _timeout ??= 999;
            set => _timeout = value;
        }

        public virtual IDataAccess DataAccess
        {
            get => _dataAccess ??= new MySqlDataAccess(ConnectionString, CommandTimeout ?? GetDefaultTimeout());
            set => _dataAccess = value;
        }

        public string ConnectionString
        {
            get
            {
                if (string.IsNullOrEmpty(_connectionString))
                {
                    _connectionString = GetDefaultConnectionString();
                };
                return _connectionString;
            }
            set
            {
                _connectionString = value;
                _dataAccess = new MySqlDataAccess(ConnectionString, CommandTimeout ?? GetDefaultTimeout());
            }
        }


        #region Constuctor 

        public DataService(IConfigService configService)
        {
            _configService = configService;
        }


        #endregion



        public IDbConnection CreateConnection()
        {
            return DataAccess.CreateConnection();
        }


        public async Task<IDbConnection> CreateConnectionAsync()
        {
            return await DataAccess.CreateConnectionAsync();
        }

        public bool ExcuteDetete(string procedureName, object[] parameter, IDbTransaction dbTransaction = null)
        {
            if (dbTransaction != null)
            {
                return DataAccess.ExecuteNonQuery(dbTransaction, procedureName, parameter);
            }
            else
            {
                return DataAccess.ExecuteNonQuery(procedureName, parameter);
            }
        }

        public Task<bool> ExcuteDeteteAsync(string procedureName, object[] parameter, IDbTransaction dbTransaction = null)
        {
            if (dbTransaction != null)
            {
                return DataAccess.ExecuteNonQueryAsync(dbTransaction, procedureName, parameter);
            }
            else
            {
                return DataAccess.ExecuteNonQueryAsync(procedureName, parammeterValues: parameter);
            }
        }

        public bool ExcuteSave(string procedureName, object entity, IDbTransaction dbTransaction = null)
        {
            var result = false;

            if (dbTransaction != null)
            {
                result = DataAccess.ExecuteNonQuery(dbTransaction, procedureName, entity);
            }
            else
            {
                result = DataAccess.ExecuteNonQuery(procedureName, entity);
            }

            return result;
        }

        public bool ExcuteSave(string procedureName, object[] parameter, IDbTransaction dbTransaction = null)
        {
            var result = false;

            if (dbTransaction != null)
            {
                result = DataAccess.ExecuteNonQuery(dbTransaction, procedureName, parameter);
            }
            else
            {
                result = DataAccess.ExecuteNonQuery(procedureName, parameter);
            }

            return result;
        }

        public async Task<bool> ExcuteSaveAsync(string procedureName, object entity, IDbTransaction dbTransaction = null)
        {
            var result = false;

            if (dbTransaction != null)
            {
                result = await DataAccess.ExecuteNonQueryAsync(dbTransaction, procedureName, entity);
            }
            else
            {
                result = await DataAccess.ExecuteNonQueryAsync(procedureName, entity);
            }

            return result;
        }

        public async Task<bool> ExcuteSaveAsync(string procedureName, object[] parameter, IDbTransaction dbTransaction = null)
        {
            var result = false;

            if (dbTransaction != null)
            {
                result = await DataAccess.ExecuteNonQueryAsync(dbTransaction, procedureName, parameter);
            }
            else
            {
                result = await DataAccess.ExecuteNonQueryAsync(procedureName, parammeterValues: parameter);
            }

            return result;
        }

        public object ExcuteScalar(string procedureName, object entity, IDbTransaction dbTransaction = null)
        {
            if (dbTransaction != null)
            {
                return DataAccess.ExecuteScalar(dbTransaction, procedureName, entity);
            }
            else
            {
                return DataAccess.ExecuteScalar(procedureName, entity);
            }
        }

        public object ExcuteScalar(string procedureName, object[] parameter, IDbTransaction dbTransaction = null)
        {
            if (dbTransaction != null)
            {
                return DataAccess.ExecuteScalar(dbTransaction, procedureName, parameter);
            }
            else
            {
                return DataAccess.ExecuteScalar(procedureName, parameter);
            }
        }

        public Task<object> ExcuteScalarAsync(string procedureName, object entity, IDbTransaction dbTransaction = null)
        {
            if (dbTransaction != null)
            {
                return DataAccess.ExecuteScalarAsyns(dbTransaction, procedureName, entity);
            }
            else
            {
                return DataAccess.ExecuteScalarAsyns(procedureName, entity);
            }
        }

        public Task<object> ExcuteScalarAsync(string procedureName, object[] parameter, IDbTransaction dbTransaction = null)
        {
            if (dbTransaction != null)
            {
                return DataAccess.ExecuteScalarAsyns(dbTransaction, procedureName, parameter);
            }
            else
            {
                return DataAccess.ExecuteScalarAsyns(procedureName, parameter);
            }
        }

        public IList<T> GetData<T>(string procedureName, object[] parameters)
        {
            IList<T> data = null;
            data = DataAccess.GetObjectList<T>(procedureName, parameters);
            return data;
        }

        public IList<T> GetData<T>(string procedureName, IList<dynamic> parameters)
        {
            IList<T> data = null;
            data = DataAccess.GetObjectList<T>(procedureName, parameters);
            return data;
        }

        public async Task<IList<T>> GetDataAsync<T>(string procedureName, object[] parameters)
        {
            IList<T> data = null;
            data = await DataAccess.GetObjectListAsync<T>(procedureName, parameters);
            return data;
        }

        public async Task<IList<T>> GetDataAsync<T>(string procedureName, object parameters)
        {
            IList<T> data = null;
            data = await DataAccess.GetObjectListAsync<T>(procedureName, parameters);
            return data;
        }

        public async Task<IList<T>> GetDataAsync<T>(string procedureName, IList<dynamic> parameters)
        {
            IList<T> data = null;
            data = await DataAccess.GetObjectListAsync<T>(procedureName, parameters);
            return data;
        }

        public string GetDefaultConnectionString()
        {
            return _configService.GetConnectionString();
        }

        public int GetDefaultTimeout()
        {
            return 999;
        }

        public T GetObject<T>(string procedureName, object[] parameters)
        {
            return DataAccess.GetObject<T>(procedureName, parameters);
        }

        public async Task<T> GetObjectAsync<T>(string procedureName, object[] parameters)
        {
            return await DataAccess.GetObjectAsync<T>(procedureName, parameters);
        }
    }
}
