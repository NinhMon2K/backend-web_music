using Dapper;
using System;
using System.Collections;
using System.Data;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using QLApp.Core.Entities;

namespace QLApp.Library.Service.Implementtion
{
    public interface IDataAccess
    {
        /// <summary>
        ///  Khởi tạo connection đến DB
        /// </summary>
        /// <returns></returns>
        IDbConnection CreateConnection();


        /// <summary>
        ///  Khởi tạo connection đến DB bất đồng bộ
        /// </summary>
        /// <returns></returns>
        Task<IDbConnection> CreateConnectionAsync();

        /// <summary>
        /// Thực hiện Thêm/Sửa/Xoá tham số đầu vào là mạng đối tượng
        /// </summary>
        /// <param name="storeProceddureName"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="parammeterValues"></param>
        /// <returns>true </returns>
        bool ExecuteNonQuery(string storeProcedureName, List<OutData> outDatas = null, params object[] parammeterValues);

        /// <summary>
        /// Thực hiện Thêm/Sửa/Xoá tham số đầu vào là mảng đối tượng theo transaction
        /// </summary>
        /// <param name="transaction">transaction </param>
        /// <param name="storedProcedureName">Ten store</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="parammeterValues"></param>
        /// <returns> true/false</returns>
        bool ExecuteNonQuery(IDbTransaction transaction, string storedProcedureName, List<OutData> outDatas = null, params object[] parammeterValues);

        /// <summary>
        /// Thực hiện Thêm/Sửa/Xoá tham số đầu vào là một object
        /// </summary>
        /// <param name="storeProcedureName"> Tên store</param>
        /// <param name="entityObject"> entity </param>
        /// <param name="outDatas">Chứa dữ liệu Out data></param>
        /// <returns> true/false </returns>
        bool ExecuteNonQuery(string storeProcedureName, object entityObject, List<OutData> outDatas = null);
        /// <summary>
        /// Thực hiện Thêm/Sửa/Xoá tham số đầu vào là mội object theo transaction
        /// </summary>
        /// <param name="transaction"> transaction </param>
        /// <param name="storeProcedureName">Tên store</param>
        /// <param name="entityObject"> entity </param>
        /// <param name="outDatas">Chứa dữ liệu Out data </param> 
        /// <returns></returns>
        bool ExecuteNonQuery(IDbTransaction transaction, string storedProcedureName, object entityObject, List<OutData> outDatas = null);

        /// <summary>
        /// Thực hiện truy vấn về trả về mội trá trị đơn (cột đầu tiên của dòng ưu tiên trong kết quả truy vấn) với tham số đâu vào là một mảng đối tượng
        /// </summary>
        /// </summary>
        /// <param name="storeProcedureName"> tên store </param>
        /// <param name="outDatas"> Chứa dữ liệu Out data </param>
        /// <param name="parammeterValues"></param>
        /// <returns></returns>
        object ExecuteScalar(string storeProcedureName, List<OutData> outDatas = null, params object[] parammeterValues);

        /// <summary>
        /// Thực hiện truy vấn Transaction trả về một giá trị đơn(cột đầu tiên của dòng ưu tiên trong kết quả truy vấn)với tham số đâu vào là một mảng đối tượng
        /// <param name="transaction">transaction </param>
        /// <param name="storedProcedureName">  tên store </param>
        /// <param name="outDatas"> Chứa dữ liệu Out data </param>
        /// <param name="parammeterValues"></param>
        /// <returns></returns>
        object ExecuteScalar(IDbTransaction transaction, string storedProcedureName, List<OutData> outDatas = null, params object[] parammeterValues);
        /// <summary>
        /// Thực hiện truy vấn về trả về mội trá trị đơn (cột đầu tiên của dòng ưu tiên trong kết quả truy vấn)với tham số đầu vào là một object 
        /// </summary>
        /// <param name="storedProcedureName">tên store</param>
        /// <param name="entityObject">  entityObject </param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        object ExecuteScalar(string storedProcedureName, object entityObject, List<OutData> outDatas = null);
        /// <summary>
        /// Thực hiện truy vấn về trả về mội trá trị đơn (cột đầu tiên của dòng ưu tiên trong kết quả truy vấn)với tham số đầu vào là một object 
        /// </summary>
        /// <param name="transaction"> transaction </param>
        /// <param name="storedProcedureName"> Tên store </param>
        /// <param name="entityObject"> entityObject </param>
        /// <param name="outDatas">>Chứa dữ liệu Out data</param>
        /// <returns> Giá trị cột đầu tiên</returns>
        object ExecuteScalar(IDbTransaction transaction, string storedProcedureName, object entityObject, List<OutData> outDatas = null);

        /// <summary>
        /// Thực hiện Thêm/Sửa?Xoá tham số đầu vào là mảng đối tượng theo  bất đồng bộ
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="outDatas"> Chứa dữ liệu Out</param>
        /// <param name="parammeterValues">  Mảng đối tượng</param>
        /// <returns></returns>
        Task<bool> ExecuteNonQueryAsync(string storedProcedureName, List<OutData> outDatas = null, params object[] parammeterValues);

        /// <summary>
        /// Thực hiện Thêm/Sửa?Xoá tham số đầu vào là mảng đối tượng theo transaction  bất đồng bộ
        /// </summary>
        /// <param name="transaction">transaction </param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="parammeterValues"></param>
        /// <returns></returns>
        Task<bool> ExecuteNonQueryAsync(IDbTransaction transaction, string storedProcedureName, List<OutData> outDatas = null, params object[] parammeterValues);
        /// <summary>
        /// Thực hiện Thêm/Sửa?Xoá tham số đầu vào là một object bất đồng bộ
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>

        Task<bool> ExecuteNonQueryAsync(string storedProcedureName, object entityObject, List<OutData> outDatas = null);
        /// <summary>
        /// Thực hiện Thêm/Sửa?Xoá tham số đầu vào là một object  theo transaction bất đồng bộ
        /// </summary>
        /// <param name="transaction">transaction </param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        Task<bool> ExecuteNonQueryAsync(IDbTransaction transaction, string storedProcedureName, object entityObject, List<OutData> outDatas = null);


        /// <summary>
        /// Thực hiện truy vấn về trả về mội trá trị đơn (cột đầu tiên của dòng ưu tiên trong kết quả truy vấn)với tham số đầu vào là một mảng đối tượng bất đồng bộ
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="parammeterValues"></param>
        /// <returns> Giá trị cột đầu tiên</returns>
        Task<object> ExecuteScalarAsyns(string storedProcedureName, List<OutData> outDatas = null, params object[] parammeterValues);
        /// <summary>
        /// Thực hiên truy vấn có transaction trả về một giá trị đơn(cột đàu tiên của dòng đầu tiên trong kết quả truy vấn )với tham số đầu vào là một mảng đối tượng bất đồng bộ
        /// </summary>
        /// <param name="transaction">transaction </param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <param name="parammeterValues"></param>
        /// <returns></returns>
        Task<object> ExecuteScalarAsyns(IDbTransaction transaction, string storedProcedureName, List<OutData> outDatas = null, params object[] parammeterValues);
        /// <summary>
        /// Thực hiên truy vấn  trả về một giá trị đơn(cột đàu tiên của dòng đầu tiên trong kết quả truy vấn )với tham số đầu vào là một object  bất đồng bộ
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        Task<object> ExecuteScalarAsyns(string storedProcedureName, object entityObject, List<OutData> outDatas = null);


        /// <summary>
        /// Thực hiên truy vấn có transaction trả về một giá trị đơn(cột đàu tiên của dòng đầu tiên trong kết quả truy vấn )với tham số đầu vào là một object  bất đồng bộ
        /// </summary>
        /// <param name="transaction">transaction </param>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        Task<object> ExecuteScalarAsyns(IDbTransaction transaction, string storedProcedureName, object entityObject, List<OutData> outDatas = null);

        /// <summary>
        /// Lấy ra danh sách object T với đầu vào là một mảng
        /// </summary>
        /// <typeparam name="T"> Đối tượng T </typeparam>
        /// <param name="storedProcedureName">Tên store </param>
        /// <param name="parammeterValues">Mảng tham số</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        IList<T> GetObjectList<T>(string storedProcedureName, object[] parammeterValues, List<OutData> outDatas = null);

        /// <summary>
        /// Lấy ra danh sách object T với đầu vào là một object 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        IList<T> GetObjectList<T>(string storedProcedureName, object entityObject, List<OutData> outDatas = null);

        /// <summary>
        /// Lấy ra danh sách với đầu vào là 1 mảng
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parammeterValues"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        IList GetObjectList(string storedProcedureName, object[] parammeterValues, List<OutData> outDatas = null);
        /// <summary>
        /// Lấy ra danh sách object T với đầu vào là 1 object
        /// </summary>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="entityObject">entity</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns></returns>
        IList GetObjectList(string storedProcedureName, object entityObject, List<OutData> outDatas = null);

        /// <summary>
        /// Lấy ra danh sách object T với đầu vào là 1 mảng bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedureName">Tên store</param>
        /// <param name="parammeterValues">parammeterValues</param>
        /// <param name="outDatas">Chứa dữ liệu Out data </param>
        /// <returns>Danh sách </returns>
        Task<IList<T>> GetObjectListAsync<T>(string storedProcedureName, object[] parammeterValues, List<OutData> outDatas = null);

        /// <summary>
        /// Lấy ra danh sách với đầu vào là 1 đối tượng bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedureName">  Tên store </param>
        /// <param name="entityObject">Mảng tham số</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>Danh sách</returns>
        Task<IList<T>> GetObjectListAsync<T>(string storedProcedureName, object entityObject, List<OutData> outDatas = null);

        /// <summary>
        /// Lấy ra danh sách với đầu vào là 1 mảng bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedureName">  Tên store </param>
        /// <param name="parammeterValues">parammeterValues</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>Danh sách</returns>
        Task<IList> GetObjectListAsync(string storedProcedureName, object[] parammeterValues, List<OutData> outDatas = null);
        /// <summary>
        /// Lấy ra đối tượng T với đầu vào là một mảng
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedureName">  Tên store </param>
        /// <param name="parammeterValues">parammeterValues</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns> Đối tượng</returns>
        T GetObject<T>(string storedProcedureName, object[] parammeterValues, List<OutData> outDatas = null);

        /// <summary>
        /// Lấy ra đối tượng object với đầu vào là 1 mảng
        /// </summary>
        /// <typeparam name="">Đối tượng T</typeparam>
        /// <param name="type"></param>
        /// <param name="storedProcedureName" >  Tên store < /param>
        /// <param name="parammeterValues"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>Object</returns>
        object GetObject<T>(Type type, string storedProcedureName, object[] parammeterValues, List<OutData> outDatas = null);

        /// <summary>
        /// Lấy ra đối tượng T với đàu vào là một mảng  bất đồng bộ
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedureName">  Tên store </param>
        /// <param name="parammeterValues">parammeterValues</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>Object</returns>
        Task<T> GetObjectAsync<T>(string storedProcedureName, object[] parammeterValues, List<OutData> outDatas = null);

        /// <summary>
        /// Lấy ra đối tượng T với đàu vào là một mảng đồng bộ
        /// </summary>
        /// <param name="type"></param>
        /// <param name="storedProcedureName">  Tên store </param>
        /// <param name="parammeterValues"></param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>Object</returns>
        Task<object> GetObjectAsync(Type type, string storedProcedureName, object[] parammeterValues, List<OutData> outDatas = null);

        /// <summary>
        /// Lấy ra mutile table tu store
        /// </summary>
        /// <param name="storedProcedureName"> Tên store </param>
        /// <param name="parammeterValues">parammeterValues</param>
        /// <param name="conn">>Chuỗi connection</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>Grid dạng dataset</returns>
        SqlMapper.GridReader QueryMultiple(string storedProcedureName, object[] parammeterValues, IDbConnection conn, List<OutData> outDatas = null);

        /// <summary>
        /// Lấy ra mutile table tu store bât đồng bộ
        /// </summary>
        /// <param name="storedProcedureName"> Tên store</param>
        /// <param name="parammeterValues">parammeterValues</param>
        /// <param name="conn">Chuỗi connection</param>
        /// <param name="outDatas">Chứa dữ liệu Out data</param>
        /// <returns>Grid dạng dataset</returns>
        Task<SqlMapper.GridReader> QueryMultipleAsync(string storedProcedureName, object[] parammeterValues, IDbConnection conn, List<OutData> outDatas = null);
    }
}
