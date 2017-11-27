package home

import org.scalatest.FunSuite

class MyFirstSuite extends FunSuite {
    test("Print ASCII data table") {
        val data = Seq(
            Seq("column 1", "column 2"),
            Seq("a", "a very long value"),
            Seq("a rather long value", "b"),
            Seq("medium", "hi hi")
        )
        println(toDataTable(data))
    }

    private def toDataTable(t: Seq[Seq[Any]]): String = {
        t match {
            case Nil => ""
            case _ =>
                val columnSizes = t.map(_.map {
                    case s: String => s.length
                    case a => a.toString.length
                }).transpose.map(_.max)
                val separator = columnSizes.map("-" * _).mkString("+", "+", "+")
                val formatedRows = t.map(row => formatRow(row, columnSizes))
                separator :: formatedRows.head :: separator :: formatedRows.tail.toList ::: separator :: Nil mkString "\n"
        }
    }

    private def formatRow(row: Seq[Any], columnSizes: Seq[Int]): String =
        row.zip(columnSizes).map {
            case (string, size) => ("%-" + size + "s").format(string)
        }.mkString("|", "|", "|")
}