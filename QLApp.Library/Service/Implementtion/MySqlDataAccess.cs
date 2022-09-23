using Dapper;
using System;
using System.Collections;
using System.Data;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using QLApp.Core.Entities;
using QLApp.Core.Service;
using MySql.Data.MySqlClient;
using QLApp.Library;

namespace QLApp.Library.Service.Implementtion
{
    public class MySqlDataAccess : IDataAccess
    {
        #region Property, variable
        /// <summary>
        /// Chuỗi connectionString
        /// </summary>
        public string ConnectionString { get; set; }
        /// <summary>
        /// Thời gian timeout
        /// </summary>
        public int CommandTimeout { get; set; }

        #endregion

        #region Contructor

        public MySqlDataAccess(string connectionstring, int commandTimeout = 999)
        {

            ConnectionString = connectionstring;

            CommandTimeout = commandTimeout;
        }
        #endregion

        #region Method

        /// <summary>
        /// Khởi tạo chuỗi connecion
        /// </summary>
        /// <returns></returns>
        public IDbConnection CreateConnection()
        {

            var conn = new MySqlConnection(ConnectionString);
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            return conn;
        }
        /// <summary>
        /// Khởi tạo chuỗi connecion async
        /// </summary>
        /// <returns></returns>
        public async Task<IDbConnection> createConnectionAsync()
        {
            var conn = new MySqlConnection(ConnectionString);

            if (conn.State == ConnectionState.Closed)
            {
                await conn.OpenAsync();
            }
            return conn;
        }
        /// <summary>
        /// Thực hiện Thêm/Sửa/Xoá tham số đâu vào là mảng đối tượng
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="parameterValues"> Mảng đối tượng</param>
        /// <returns>true/False</returns>
        public bool ExecuteNonQuery(string storedProcedureName, List<OutData> outDatas = null, params object[] parameterValues)
        {
            var result = true;

            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
                var cmd = new CommandDefinition(storedProcedureName, objParam, null, CommandTimeout, CommandType.StoredProcedure);
                var affectRow = conn.Execute(cmd);
                result = affectRow > 0;
                //Lấy outDatas nếu có
                if (result && outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
                return result;
            }
        }
        /// <summary>
        /// Thực hiện Thêm/Sửa/Xoá tham số đâu vào là mảng đối tượng theo transaction
        /// </summary>
        /// <param name="transaction">transaction </param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="parameterValues"></param>
        /// <returns></returns>
        public bool ExecuteNonQuery(IDbTransaction transaction, string storedProcedureName, List<OutData> outDatas = null, params object[] parameterValues)
        {
            var conn = transaction.Connection;

            var objParam = CreateParam(storedProcedureName, (MySqlConnection)conn, parameterValues, outDatas);

            var affectRow = conn.Execute(storedProcedureName, objParam, transaction, commandTimeout: CommandTimeout, commandType: CommandType.StoredProcedure);

            bool result = affectRow > 0;
            //Lấy outDatas nếu có

            if (result && outDatas != null && outDatas.Count > 0)
            {
                foreach (var outData in outDatas)
                {
                    outData.Value = objParam.Get<dynamic>(outData.Key);
                }
            }
            return result;
        }
        /// <summary>
        /// Thực hiện Thêm/Sửa/Xoá tham số đâu vào là 1 object
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public bool ExecuteNonQuery(string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {
            var result = true;

            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, entityObject, outDatas);

                var atfectRow = conn.Execute(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: CommandType.StoredProcedure);
                result = atfectRow > 0;
                //Lấy outDatas nếu có
                if (result && outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
            }
            return result;
        }

        /// <summary>
        /// Thực hiện Thêm/Sửa/Xoá tham số đâu vào là 1 object theo transaction
        /// </summary>
        /// <param name="transaction">transaction </param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>true/ False</returns>
        public bool ExecuteNonQuery(IDbTransaction transaction, string storedProcedureName, object entityobject, List<OutData> outDatas = null)
        {
            var conn = transaction.Connection;
            var objParam = CreateParam(storedProcedureName, (MySqlConnection)conn, entityobject, outDatas);
            var affectRow = conn.Execute(storedProcedureName, objParam, transaction, commandTimeout: CommandTimeout, commandType: CommandType.StoredProcedure);

            bool result = affectRow > 0;

            //Lấy outDatas nếu có
            if (result && outDatas != null && outDatas.Count > 0)
            {
                foreach (var outData in outDatas)
                {
                    outData.Value = objParam.Get<dynamic>(outData.Key);
                }

            }
            return result;
        }
        /// <summary>
        /// Thực hiện truy vấn trả về một giá trị đơn(cột đầu tiên  cảu dòng đầu tiên trong kết quả truy vấn)với tham số đầu vào là một đối tượng
        /// </summary>
        /// <param name="storedProcedureName">Tên store </param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="parameterValues"></param>
        /// <returns> Giá trị  cột đầu tiên</returns>
        public object ExecuteScalar(string storedProcedureName, List<OutData> outDatas = null, params object[] parameterValues)
        {
            object res;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
                res = conn.ExecuteScalar(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: CommandType.StoredProcedure);
                //Lấy outDatas nếu có
                if (outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
            }
            return res;
        }

        /// <summary>
        /// Thực hiện truy vấn có transaction trả về một giá trị đơn(cột đầu tiên  cảu dòng đầu tiên trong kết quả truy vấn)với tham số đầu vào là một mảng đối tượng
        /// </summary>
        /// <param name="transaction">transaction </param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="parameterValues"></param>
        /// <returns> Giá trị  cột đầu tiên</returns>
        public object ExecuteScalar(IDbTransaction transaction, string storedProcedureName, List<OutData> outDatas = null, params object[] parameterValues)
        {
            var conn = transaction.Connection;
            var objParam = CreateParam(storedProcedureName, (MySqlConnection)conn, parameterValues, outDatas);
            var res = conn.ExecuteScalar(storedProcedureName, objParam, transaction, commandTimeout: CommandTimeout, commandType: CommandType.StoredProcedure);
            //Lấy  outDatas nếu có
            if (outDatas != null && outDatas.Count > 0)
            {
                foreach (var outData in outDatas)
                {
                    outData.Value = objParam.Get<dynamic>(outData.Key);
                }

            }
            return res;
        }
        /// <summary>
        /// Thực hiện truy vấn  trả về một giá trị đơn(cột đầu tiên  cảu dòng đầu tiên trong kết quả truy vấn)với tham số đầu vào là một object
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject"> entityObject </param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>Giá trị  cột đầu tiên</returns>

        public object ExecuteScalar(string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {
            object res;

            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, entityObject, outDatas);

                res = conn.ExecuteScalar(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);
                //Lấy  outDatas nếu có
                if (outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
            }
            return res;
        }

        /// <summary>
        /// Thực hiện truy vấn  transaction trả về một giá trị đơn(cột đầu tiên  cảu dòng đầu tiên trong kết quả truy vấn)với tham số đầu vào là một object
        /// </summary>
        /// <param name="transaction">transaction</param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entityObject</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>Giá trị  cột đầu tiên</returns>
        public object ExecuteScalar(IDbTransaction transaction, string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {
            var conn = transaction.Connection;
            var objParam = CreateParam(storedProcedureName, (MySqlConnection)conn, entityObject, outDatas);
            var res = conn.ExecuteScalar(storedProcedureName, objParam, transaction, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);
            ///Lấy  outDatas nếu có
            if (outDatas != null && outDatas.Count > 0)
            {
                foreach (var outData in outDatas)
                {
                    outData.Value = objParam.Get<dynamic>(outData.Key);
                }

            }
            return res;
        }

        /// <summary>
        /// Thực hiện Thêm/Sửa/Xoá tham số đầu vào là một mảng đối tượng bất đồng bộ
        /// </summary> 
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="parameterValues">Mảng đối tượng</param>
        /// <returns>true/False</returns>
        public async Task<bool> ExecuteNonQueryAsync(string storedProcedureName, List<OutData> outDatas = null, params object[] parameterValues)
        {
            var result = true;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    await conn.OpenAsync();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
                var affectRow = await conn.ExecuteAsync(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: CommandType.StoredProcedure);
                result = affectRow > 0;
                ///Lấy  outDatas nếu có
                if (result && outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
            }
            return result;
        }

        /// <summary>
        ///  Thực hiện Thêm/Sửa/Xoá tham số đầu vào là một mảng đối tượng  bất đồng bộ
        /// </summary>
        /// <param name="transaction">transaction</param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="parameterValues" > Mảng đối tượng /param>
        /// <returns>true/False</returns>
        public async Task<bool> ExecuteNonQueryAsync(IDbTransaction transaction, string storedProcedureName, List<OutData> outDatas = null, params object[] parameterValues)
        {

            var conn = (MySqlConnection)transaction.Connection;
            var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
            var affectRow = await conn.ExecuteAsync(storedProcedureName, objParam, commandTimeout: CommandTimeout, commandType: CommandType.StoredProcedure);
            bool result = affectRow > 0;
            ///Lấy  outDatas nếu có
            if (result && outDatas != null && outDatas.Count > 0)
            {
                foreach (var outData in outDatas)
                {
                    outData.Value = objParam.Get<dynamic>(outData.Key);
                }
            }
            return result;
        }

        /// <summary>
        /// Thực hiện Thêm/Sửa/Xoá tham số đầu vào là một object  bất đồng bộ
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>true/False</returns>
        public async Task<bool> ExecuteNonQueryAsync(string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {
            var result = true;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    await conn.OpenAsync();
                }
                var objParam = CreateParam(storedProcedureName, conn, entityObject, outDatas);
                var affectRow = await conn.ExecuteAsync(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: CommandType.StoredProcedure);
                result = affectRow > 0;
                ///Lấy  outDatas nếu có
                if (result && outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
            }
            return result;
        }

        /// <summary>
        /// Thực hiện Thêm/Sửa/Xoá tham số đầu vào là một object theo transaction bất đồng bộ
        /// </summary>
        /// <param name="transaction">transaction</param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>true/False</returns>
        public async Task<bool> ExecuteNonQueryAsync(IDbTransaction transaction, string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {

            var conn = (MySqlConnection)transaction.Connection;
            var objParam = CreateParam(storedProcedureName, conn, entityObject, outDatas, transaction);
            var affectRow = await conn.ExecuteAsync(storedProcedureName, objParam, transaction, commandTimeout: CommandTimeout, commandType: CommandType.StoredProcedure);

            bool result = affectRow > 0;
            ///Lấy  outDatas nếu có
            if (result && outDatas != null && outDatas.Count > 0)
            {
                foreach (var outData in outDatas)
                {
                    outData.Value = objParam.Get<dynamic>(outData.Key);
                }
            }
            return result;
        }

        /// <summary>
        /// Thực hiện truy vấn  trả về một giá trị đơn(cột đầu tiên  cảu dòng đầu tiên trong kết quả truy vấn)với tham số đầu vào là một mảng đối tượng bất đồng bộ
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="outDatas"> Chứa dữ liệu Out data</param>
        /// <param name="parameterValuess"></param>
        /// <returns>Giá trị cột đàu tiên</returns>
        public async Task<object> ExecuteScalarAsync(string storedProcedureName, List<OutData> outDatas = null, params object[] parameterValuess)
        {
            object res;

            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    await conn.OpenAsync();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValuess, outDatas);

                res = await conn.ExecuteScalarAsync(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);
                //Lấy  outDatas nếu có
                if (outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
            }
            return res;
        }
        /// <summary>
        /// Thực hiện truy vấn có Trabsaction trả về một giá trị đơn(cột đầu tiên  cảu dòng đầu tiên trong kết quả truy vấn)với tham số đầu vào là một mảng đối tượng bất đồng bộ
        /// </summary>
        /// <param name="transaction">transaction </param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="outDatas"> Chứa dữ liệu Out data</param>
        /// <param name="parameterValues"></param>
        /// <returns>Giá trị cột đàu tiên</returns>
        public async Task<object> ExecuteScalarAsync(IDbTransaction transaction, string storedProcedureName, List<OutData> outDatas = null, params object[] parameterValues)
        {
            var conn = (MySqlConnection)transaction.Connection;
            var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
            var res = await conn.ExecuteScalarAsync(storedProcedureName, objParam, transaction, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

            ///Lấy  outDatas nếu có
            if (outDatas != null && outDatas.Count > 0)
            {
                foreach (var outData in outDatas)
                {
                    outData.Value = objParam.Get<dynamic>(outData.Key);
                }
            }
            return res;
        }

        /// <summary>
        /// Thực hiện truy vấn  trả về một giá trị đơn(cột đầu tiên  cảu dòng đầu tiên trong kết quả truy vấn)với tham số đầu vào là một mảng object bất đồng bộ
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entityObject</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public async Task<object> ExecuteScalarAsync(string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {
            object res;

            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    await conn.OpenAsync();
                }
                var objParam = CreateParam(storedProcedureName, conn, entityObject, outDatas);

                res = await conn.ExecuteScalarAsync(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);
                //Lấy  outDatas nếu có
                if (outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
            }
            return res;
        }
        /// <summary>
        /// Thực hiện truy vấn có Trabsaction trả về một giá trị đơn(cột đầu tiên  cảu dòng đầu tiên trong kết quả truy vấn)với tham số đầu vào là một mảng object bất đồng bộ
        /// </summary>
        /// <param name="transaction">transaction </param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public async Task<object> ExecuteScalarAsync(IDbTransaction transaction, string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {
            var conn = (MySqlConnection)transaction.Connection;
            var objParam = CreateParam(storedProcedureName, conn, entityObject, outDatas);
            var res = await conn.ExecuteAsync(storedProcedureName, objParam, transaction, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);
            ///Lấy  outDatas nếu có
            if (outDatas != null && outDatas.Count > 0)
            {
                foreach (var outData in outDatas)
                {
                    outData.Value = objParam.Get<dynamic>(outData.Key);
                }
            }
            return res;
        }
        /// <summary>
        /// Lấy ra danh sách object TT với đầu  vào là một mảng
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parameterValues"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public IList<T> GetObjectList<T>(string storedProcedureName, object[] parameterValues, List<OutData> outDatas = null)
        {
            IList<T> ts = null;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
                var list = conn.Query<T>(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

                if (list != null)
                {
                    ts = list.AsList<T>();
                    //Lấy  outDatas nếu có 
                    if (outDatas != null && outDatas.Count > 0)
                    {
                        foreach (var outData in outDatas)
                        {
                            outData.Value = objParam.Get<dynamic>(outData.Key);
                        }
                    }
                }
            }
            return ts;
        }
        /// <summary>
        /// Lấy ra danh sách object T với đầu  vào là một object
        /// </summary>
        /// <typeparam name="T">Đối tượng T</typeparam>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public IList<T> GetObjectList<T>(string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {
            IList<T> ts = null;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, entityObject, outDatas);
                var list = conn.Query<T>(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

                if (list != null)
                {
                    ts = list.AsList<T>();
                    //Lấy  outDatas nếu có 
                    if (outDatas != null && outDatas.Count > 0)
                    {
                        foreach (var outData in outDatas)
                        {
                            outData.Value = objParam.Get<dynamic>(outData.Key);
                        }
                    }
                }
            }
            return ts;
        }
        /// <summary>
        /// Lấy ra danh sách với đầu vào là 1 mảng
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parameterValues"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public IList GetObjectList(string storedProcedureName, object[] parameterValues, List<OutData> outDatas = null)
        {

            IList ts = null;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
                var list = conn.Query(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

                if (list != null)
                {
                    ts = list.AsList();
                    //Lấy  outDatas nếu có 
                    if (outDatas != null && outDatas.Count > 0)
                    {
                        foreach (var outData in outDatas)
                        {
                            outData.Value = objParam.Get<dynamic>(outData.Key);
                        }
                    }
                }
            }
            return ts;
        }

        /// <summary>
        /// Lấy ra danh sách object T với đầu vào là 1 objectt
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public IList GetObjectList(string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {

            IList ts = null;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, entityObject, outDatas);
                var list = conn.Query(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

                if (list != null)
                {
                    ts = list.AsList();
                    //Lấy  outDatas nếu có 
                    if (outDatas != null && outDatas.Count > 0)
                    {
                        foreach (var outData in outDatas)
                        {
                            outData.Value = objParam.Get<dynamic>(outData.Key);
                        }
                    }
                }
            }
            return ts;
        }


        /// <summary>
        /// Lấy danh sách object T  với đầu vào là 1 mảng bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parameterValues"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public async Task<IList<T>> GetObjectListAsync<T>(string storedProcedureName, object[] parameterValues, List<OutData> outDatas = null)
        {
            IList<T> ts = null;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
                var list = await conn.QueryAsync<T>(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

                if (list != null)
                {
                    ts = list.AsList<T>();
                    //Lấy  outDatas nếu có 
                    if (outDatas != null && outDatas.Count > 0)
                    {
                        foreach (var outData in outDatas)
                        {
                            outData.Value = objParam.Get<dynamic>(outData.Key);
                        }
                    }
                }
            }
            return ts;
        }

        /// <summary>
        /// Lấy danh sách object  T với đầu vào là 1 object bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public async Task<IList<T>> GetObjectListAsync<T>(string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {
            IList<T> ts = null;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, entityObject, outDatas);
                var list = await conn.QueryAsync<T>(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

                if (list != null)
                {
                    ts = list.AsList<T>();
                    //Lấy  outDatas nếu có 
                    if (outDatas != null && outDatas.Count > 0)
                    {
                        foreach (var outData in outDatas)
                        {
                            outData.Value = objParam.Get<dynamic>(outData.Key);
                        }
                    }
                }
            }
            return ts;
        }
        /// <summary>
        /// Lấy ra danh sách với đầu vào là 1 đối tượng bất đồng bộ
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public async Task<IList> GetObjectListAsync(string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {
            IList ts = null;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, entityObject, outDatas);
                var list = await conn.QueryAsync(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

                if (list != null)
                {
                    ts = list.AsList();
                    //Lấy  outDatas nếu có 
                    if (outDatas != null && outDatas.Count > 0)
                    {
                        foreach (var outData in outDatas)
                        {
                            outData.Value = objParam.Get<dynamic>(outData.Key);
                        }
                    }
                }
            }
            return ts;
        }
        /// <summary>
        ///  Lấy ra danh sách với đầu vào là 1 mảng bất đồng bộ
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parameterValues"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public async Task<IList> GetObjectListAsync(string storedProcedureName, object[] parameterValues, List<OutData> outDatas = null)
        {
            IList ts = null;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    await conn.OpenAsync();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
                var list = await conn.QueryAsync(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

                if (list != null)
                {
                    ts = list.AsList();
                    //Lấy  outDatas nếu có 
                    if (outDatas != null && outDatas.Count > 0)
                    {
                        foreach (var outData in outDatas)
                        {
                            outData.Value = objParam.Get<dynamic>(outData.Key);
                        }
                    }
                }
            }
            return ts;
        }

        /// <summary>
        /// Lấy ra đối tượng T với đầu vào là 1 mảng
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parameterValues"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public T GetObject<T>(string storedProcedureName, object[] parameterValues, List<OutData> outDatas = null)
        {
            T res;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
                var cmd = new CommandDefinition(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);
                res = conn.QueryFirstOrDefault<T>(cmd);

                //Lấy  outDatas nếu có 
                if (outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
            }
            return res;
        }
        /// <summary>
        /// Lấy ra đối tượng object với đầu vào là 1 mảng
        /// </summary>
        /// <param name="type"></param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parameterValues"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public object GetObject(Type type, string storedProcedureName, object[] parameterValues, List<OutData> outDatas = null)
        {
            object res;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
                res = conn.QueryFirstOrDefault(type, storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

                //Lấy  outDatas nếu có 
                if (outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
            }
            return res;
        }

        /// <summary>
        /// Lấy ra đối tượng T với đầu vào là 1 mảng bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parameterValues"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public async Task<T> GetObjectAsync<T>(string storedProcedureName, object[] parameterValues, List<OutData> outDatas = null)
        {
            T res;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    await conn.OpenAsync();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
                res = await conn.QueryFirstOrDefaultAsync<T>(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

                //Lấy  outDatas nếu có 
                if (outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
            }
            return res;

        }

        /// <summary>
        /// Lấy ra đối tượng T với đầu vào là 1 mảng bất đồng bộ
        /// </summary>
        /// <param name="type"></param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parameterValues"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public async Task<object> GetObjectAsync(Type type, string storedProcedureName, object[] parameterValues, List<OutData> outDatas = null)
        {
            object res;
            using (var conn = new MySqlConnection(ConnectionString))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    await conn.OpenAsync();
                }
                var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
                res = await conn.QueryFirstOrDefaultAsync(type, storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: System.Data.CommandType.StoredProcedure);

                //Lấy  outDatas nếu có 
                if (outDatas != null && outDatas.Count > 0)
                {
                    foreach (var outData in outDatas)
                    {
                        outData.Value = objParam.Get<dynamic>(outData.Key);
                    }
                }
            }
            return res;
        }
        /// <summary>
        /// Lấy ra mutile table tử store
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parameterValues"></param>
        /// <param name="transaction">transaction </param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public SqlMapper.GridReader QueryMultiple(string storedProcedureName, object[] parameterValues, IDbConnection conn, List<OutData> outDatas = null)
        {
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            var objParam = CreateParam(storedProcedureName, (MySqlConnection)conn, parameterValues, outDatas);
            var gridReader = conn.QueryMultiple(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: CommandType.StoredProcedure);
            //Lấy  outDatas nếu có 
            if (outDatas != null && outDatas.Count > 0)
            {
                foreach (var outData in outDatas)
                {
                    outData.Value = objParam.Get<dynamic>(outData.Key);
                }
            }
            return gridReader;
        }

        /// <summary>
        /// Lấy ra mutile table từ store bất đồng bộ
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parameterValues"></param>
        /// <param name="dbConnection"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        public async Task<SqlMapper.GridReader> QueryMultipleAsync(string storedProcedureName, object[] parameterValues, IDbConnection dbConnection, List<OutData> outDatas = null)
        {
            var conn = (MySqlConnection)dbConnection;
            if (conn.State == ConnectionState.Closed)
            {
                await conn.OpenAsync();
            }
            var objParam = CreateParam(storedProcedureName, conn, parameterValues, outDatas);
            var gridReader = conn.QueryMultiple(storedProcedureName, objParam, null, commandTimeout: CommandTimeout, commandType: CommandType.StoredProcedure);
            //Lấy  outDatas nếu có 
            if (outDatas != null && outDatas.Count > 0)
            {
                foreach (var outData in outDatas)
                {
                    outData.Value = objParam.Get<dynamic>(outData.Key);
                }
            }
            return gridReader;
        }
        /// <summary>
        /// Build lại param cần thiết từ đống param truyền vào đấy lên store
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="cnn">cnn</param>
        /// <param name="obj">obj</param>
        /// <param name="outDatas"> Dữ liệu ra</param>
        /// <param name="dbTransaction">dbTransaction</param>
        /// <returns></returns>
        private DynamicParameters CreateParam(string storeName, MySqlConnection cnn, object[] obj, List<OutData> outDatas, IDbTransaction dbTransaction = null)
        {
            var dynamicParameters = new DynamicParameters();
            if (obj != null && obj.Length > 0)
            {
                var paramArray = DiscoverParameter(cnn, storeName, true, dbTransaction);
                for (var i = 0; i < paramArray.Length; i++)
                {
                    try
                    {
                        var parameterValue = i < obj.Length ? obj[i] : null;
                        dynamicParameters.Add(paramArray[i].ParameterName, parameterValue, paramArray[i].DbType, direction: paramArray[i].Direction);

                        if (paramArray[i].Direction == ParameterDirection.InputOutput ||
                            paramArray[i].Direction == ParameterDirection.Output)
                        {
                            outDatas?.Add(new OutData()
                            {
                                Key = paramArray[i].ParameterName,
                                Type = paramArray[i].DbType.ToString()
                            });
                        }
                    }
                    catch (Exception)
                    {
                        throw new Exception("ERROR" + paramArray[i].ParameterName);
                    }

                }
            }
            return dynamicParameters;
        }

        /// <summary>
        /// Build lại param cần thiết từ đống param truyền vào đấy lên store
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="cnn">cnn</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="dbTransaction"></param>
        /// <returns></returns>
        private DynamicParameters CreateParam(string storeName, MySqlConnection cnn, object entityObject, List<OutData> outDatas, IDbTransaction dbTransaction = null)
        {

            var dynamicParameters = new DynamicParameters();
            var paramArray = DiscoverParameter(cnn, storeName, true, dbTransaction);
            foreach (var param in paramArray)
            {
                if (param != null)
                {
                    var parameterName = param.ParameterName;
                    try
                    {
                        parameterName = parameterName.Replace(parameterName.Contains("$") ? "@$" : "@", "");
                        var parameterValue = entityObject.GetValueByPropertyName(parameterName);
                        dynamicParameters.Add(param.ParameterName, parameterValue, param.DbType, direction: param.Direction);
                        if (param.Direction == ParameterDirection.InputOutput ||
                                param.Direction == ParameterDirection.Output)
                        {
                            outDatas?.Add(new OutData()
                            {
                                Key = param.ParameterName,
                                Type = param.DbType.ToString()
                            });
                        }
                    }
                    catch (Exception)
                    {
                        throw new Exception("ERROR" + param.ParameterName);
                    }
                }

            }
            return dynamicParameters;
        }


        /// <summary>
        /// resolve at time the appropriate set of SplParameters for a stored procedure
        /// </summary>
        /// <param name="cnn">a SQL connection are opened </param>
        /// <param name="spName">the name ò the storea procedure</param>
        /// <param name="includeReturnValueParameter"> whether or not to include their return Parameter </param>
        /// <param name="trans"></param>
        /// <returns></returns>
        private MySqlParameter[] DiscoverParameter(MySqlConnection cnn, string spName, bool includeReturnValueParameter, IDbTransaction trans = null)
        {
            using var cmd = new MySqlCommand(spName, cnn, (MySqlTransaction)trans);

            if (trans != null)
            {
                cmd.Transaction = (MySqlTransaction)trans;
            }
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlCommandBuilder.DeriveParameters(cmd);
            if (!includeReturnValueParameter)
            {
                cmd.Parameters.RemoveAt(0);
            }
            var discoverParameters = new MySqlParameter[cmd.Parameters.Count]; ;
            cmd.Parameters.CopyTo(discoverParameters, 0);
            return discoverParameters;

        }

        public Task<IDbConnection> CreateConnectionAsync()
        {
            throw new NotImplementedException();
        }

        public Task<object> ExecuteScalarAsyns(string storedProcedureName, List<OutData> outDatas = null, params object[] parammeterValues)
        {
            throw new NotImplementedException();
        }

        public Task<object> ExecuteScalarAsyns(IDbTransaction transaction, string storedProcedureName, List<OutData> outDatas = null, params object[] parammeterValues)
        {
            throw new NotImplementedException();
        }

        public Task<object> ExecuteScalarAsyns(string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {
            throw new NotImplementedException();
        }

        public Task<object> ExecuteScalarAsyns(IDbTransaction transaction, string storedProcedureName, object entityObject, List<OutData> outDatas = null)
        {
            throw new NotImplementedException();
        }

        public object GetObject<T>(Type type, string storedProcedureName, object[] parammeterValues, List<OutData> outDatas = null)
        {
            throw new NotImplementedException();
        }

        #endregion

    }
}