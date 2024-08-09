import { NextResponse } from "next/server";
import mongodb from "@/utils/mongodb";
import Sentence from "@/models/sentence";

export async function POST(req ) {
  await mongodb();
  try {
    const data = await Sentence.create({...await req.json()});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(req ) {
  await mongodb();
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    const data = await Sentence.findByIdAndDelete({_id : id});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function PUT(req ) {
  await mongodb();
  try {
    const url = new URL(req.url);
    const _id = url.searchParams.get('id');

    const data = await Sentence.findByIdAndUpdate(_id  , {... await req.json()});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function GET(req) {
  await mongodb();
  // let res = await req.json() 
  // clg
  try {
    const data = await Sentence.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: error });
  }

}
